import { useState } from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'
import LLM from './Components/LLM/LLM';
import Upload from './Components/FileUpload/Upload';
import { endpoint } from './utils/Endpoint';
import axios from 'axios'

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showTextField, setShowTextField] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [singleResponse, setSingleResponse] = useState(null)
    const [showSpinner, setShowSpinner] = useState(false)

    // Helper function to generate FormData
    const createFormData = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        return formData;
    };

    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    };

    const Analysis = async () => {
        if (!selectedFile) return alert("Please upload a resume first.");
        setShowTextField(false);
        setShowSpinner(true);
        try {
            const response = await axios.post(`${endpoint}/ResumeAnalysis/getanalysis`, createFormData(), config);
            setSingleResponse(response.data);
           // alert(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error("Analysis error:", error);
           // alert(JSON.stringify(error.response?.data || "Analysis failed", null, 2));
        } finally {
            setShowSpinner(false);
        }
    }

    const Mock = async () => {
        if (!selectedFile) return alert("Please upload a resume first.");
        setShowTextField(true);
        setShowSpinner(true);
        try {
            const response = await axios.post(`${endpoint}/ResumeAnalysis/getmockinterviews`, createFormData(), config);
            setSingleResponse(response.data);
           // alert(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error("Mock interview error:", error);
        } finally {
            setShowSpinner(false);
        }
    }

    const Career = async () => {
        if (!selectedFile) return alert("Please upload a resume first.");
        setShowTextField(false);
        setShowSpinner(true);
        try {
            const response = await axios.post(`${endpoint}/ResumeAnalysis/getcareerpaths`, createFormData(), config);
            setSingleResponse(response.data);
           // alert(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error("Career path error:", error);
        } finally {
            setShowSpinner(false);
        }
    }

    const Recommendation = async () => {
        if (!selectedFile) return alert("Please upload a resume first.");
        setShowTextField(false);
        setShowSpinner(true);
        try {
            const response = await axios.post(`${endpoint}/ResumeAnalysis/getskillsrecommendation`, createFormData(), config);
            setSingleResponse(response.data);
           // alert(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error("Recommendation error:", error);
        } finally {
            setShowSpinner(false);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            alert("Please select a valid PDF file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return alert("No file selected.");
        try {
            const response = await axios.post(`${endpoint}/ResumeAnalysis/uploadResume`, createFormData(), config);
            alert("File uploaded successfully");
            setBtnDisabled(false);
        } catch (error) {
            alert(JSON.stringify(error.response?.data || "Network error", null, 2));
        }
    };

    return (
        <>
            <Navbar className="bg-body-tertiary ">
                <Container className='d-flex justify-content-center' >
                    <Navbar.Brand href="#home" >
                        <img alt="logo" src="./CareerTrail_logo.jpg" width={100} className="d-block align-middle rounded-circle shadow-box" />
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className='grid-container' >
                <Row className='h-100'>
                    <Col className="d-flex justify-content-center" xs={12}>
                        <Upload feature1={Analysis} feature2={Mock} feature3={Career} feature4={Recommendation} handleFileChange={handleFileChange} handleSubmit={handleSubmit} btnDisabled={btnDisabled} setBtnDisabled={setBtnDisabled} />
                    </Col>
                    <Col className="d-flex justify-content-center" xs={12}>
                        <LLM showTextField={showTextField} showSpinner={showSpinner} singleResponse={singleResponse} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home;