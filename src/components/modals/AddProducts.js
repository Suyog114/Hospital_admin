import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { addData } from '../../redux/slices/ProductSlice'
import { useDispatch } from "react-redux";
import { API_URL } from "../../api_config";


export default function AddProducts() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    availableQuantity: "",
    desc: "",
    img: "",
    genre: ""
  })

  const [img, setImg] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()
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
      if (productData.name === "" || productData.price === "" || productData.img === "" || productData.desc === "" || productData.genre === "") {
        toast.error("Fields Cannot Be Empty !", {
          position: "top-right",
          theme: "colored"
        });
      } else {
        const res = await axios.post(`${API_URL}/product/addProduct`, productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        dispatch(addData({...productData, id:res.data.id, img: img}))
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



  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="input-group mb-3">
              <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Enter Product Name" id="productName" />
            </div>
            <div className="input-group mb-3">
              <input type="number" name="price" onChange={handleChange} className="form-control" placeholder="Enter Product Price" id="productPrice" />
            </div>
            <div className="input-group mb-3">
              <input type="number" name="availableQuantity" onChange={handleChange} className="form-control" placeholder="Enter Available Quantity" id="productQuantity" />
            </div>

            <div className="input-group mb-3">
              <textarea type="text" name="desc" onChange={handleChange} className="form-control" placeholder="Enter Product Desciption" id="productDesc" />
            </div>



            <div class="input-group mb-3">

              <select class="form-select" id="inputGroupSelect01" name="genre" onChange={handleChange}>
                <option selected>Select Product Genre</option>
                <option value="Cream">Cream</option>
                <option value="Medicine">Medicine</option>
                <option value="liquid">liquid</option>
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
          <Button variant="secondary" onClick={handleSave}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />

    </>
  )
}