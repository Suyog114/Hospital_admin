import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { editData } from '../../../redux/slices/ProductSlice'
import { useDispatch } from "react-redux";
import { API_URL } from "../../../api_config";


export default function EditProducts() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    availableQuantity: "",
    desc: "",
    genre: ""
  })

  const [img, setImg] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const id = window.location.pathname.split('/')[3]

  const handleClose = () => navigate('/products');

  const handleChange = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImgChange = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }))
    setImg(e.target.files[0].name)
  }

  const handleSave = async () => {
    // e.preventDefault()
    try {
      if (productData.name === "" || productData.price === "" || productData.desc === "" || productData.genre === "") {
        toast.error("Fields Cannot Be Empty !", {
          position: "top-right",
          theme: "colored"
        });
      } else {
        const res = await axios.patch(`${API_URL}/product/updateProduct/${id}`, productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        dispatch(editData({ id: id, newData: {...productData, img} }))
        navigate('/products')
        toast.success('Successfully Added', {
          position: "top-right",
          theme: "colored"
        })

      }
    } catch (error) {
      toast.error('Failed to post product', {
        position: "top-right",
        theme: "colored"
      })
      console.log(error)
    }
  }



  useEffect(() => {
    axios.get(`${API_URL}/product/getOneProduct/${id}`).then((res) => {
      setProductData(res.data)
      setImg(res.data.img)
    }).catch((error) => { console.log(error) })
  }, [])

  console.log(productData)
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div class="inputGroup">
              <input type="text" name="name" value={productData.name} onChange={handleChange} id="productName" ></input>
                <label for="name">Name</label>
            </div>
            <div class="inputGroup">
              <input type="text" name="price" value={productData.price} onChange={handleChange} id="productPrice" ></input>
                <label for="price">Price</label>
            </div>

            <div class="inputGroup">
              <input type="text" name="availableQuantity" value={productData.availableQuantity} onChange={handleChange} id="productQuantity" ></input>
                <label for="availableQuantity">Available Quantity</label>
            </div>

            <div className="input-group mb-3">
              <textarea type="text" name="desc" value={productData.desc} onChange={handleChange} className="form-control" placeholder="Enter Product Desciption" id="productDesc" />
            </div>

            <div class="input-group mb-3">

              <select class="form-select" id="inputGroupSelect01" name="genre" value={productData.genre} onChange={handleChange}>
                <option selected>Select Product Genre</option>
                <option value="Cream">Cream</option>
                <option value="medicine">Medicine</option>
                <option value="thermometer">Thermometer</option>
              </select>
            </div>

            {/* upload file */}
            <div class=" d-flex align-items-center justify-content-between">
              <label for="formFile" class="form-label">Image: </label>
              <input name="img" onChange={handleImgChange} class="form-control m-3" type="file" id="formFile"></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSave}>Edit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />

    </>
  )
}