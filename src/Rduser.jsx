import axios from 'axios';
import './Rduser.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";

export default function Rduser() {
  const [data, setData] = useState([]); // State to store fetched data
  const [pdata, setPData] = useState([]); // State to store fetched data

  const [totalAmt, setTotalAmt] = useState(0);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [pshow, setPShow] = useState(false);
  const handlePClose = () => setPShow(false);
  const handlePShow = () => setPShow(true);
  //for passs book entry show
  const [peshow, setPeShow] = useState(false);
  const handlePeClose = () => setPeShow(false);
  const handlePeShow = () => setPeShow(true);

  // Update state
  const [Ushow, setUShow] = useState(false);
  const handleUClose = () => setUShow(false);
  const handleUShow = () => setUShow(true);

  // State variables to store user details
  const [rid, setRid] = useState(0);
  const [name, setName] = useState("");
  const [uaddr, setUaddr] = useState(""); // User Address
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [rddate, setRddate] = useState("");
  const [rdamt, setRdamt] = useState("");
  const [occupation, setOccupation] = useState("");
  const [acno, setAcno] = useState("");
  const [adharno, setAdharno] = useState("");
  const [panno, setPanno] = useState("");
  const [nname, setNname] = useState("");
  const [naddr, setNaddr] = useState(""); // Nominee Address
  const [nadharno, setNadharno] = useState(""); // Nominee Aadhar Number
  const [npanno, setNpanno] = useState("");

  // Additional states for Passbook
  const [ldt, setLdt] = useState("");
  const [famt, setFamt] = useState("");

  // Input change handlers for saving a new user
  const handleName = (e) => setName(e.target.value);
  const handleUaddr = (e) => setUaddr(e.target.value);
  const handleDob = (e) => setDob(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleRddate = (e) => setRddate(e.target.value);
  const handleRdamt = (e) => setRdamt(e.target.value);
  const handleOccupation = (e) => setOccupation(e.target.value);
  const handleAcno = (e) => setAcno(e.target.value);
  const handleAdharno = (e) => setAdharno(e.target.value);
  const handlePanno = (e) => setPanno(e.target.value);
  const handleNname = (e) => setNname(e.target.value);
  const handleNaddr = (e) => setNaddr(e.target.value);
  const handleNadharno = (e) => setNadharno(e.target.value);
  const handleNpanno = (e) => setNpanno(e.target.value);

  // Passbook handlers
  const phandleRddate = (e) => setRddate(e.target.value);
  const phandleRdamt = (e) => setRdamt(e.target.value);
  const phandleLdt = (e) => setLdt(e.target.value);
  const phandleFamt = (e) => setFamt(e.target.value);

  // Input change handlers for updating a user
  const uhandleName = (e) => setName(e.target.value);
  const uhandleUaddr = (e) => setUaddr(e.target.value);
  const uhandleDob = (e) => setDob(e.target.value);
  const uhandleGender = (e) => setGender(e.target.value);
  const uhandleRddate = (e) => setRddate(e.target.value);
  const uhandleRdamt = (e) => setRdamt(e.target.value);
  const uhandleOccupation = (e) => setOccupation(e.target.value);
  const uhandleAcno = (e) => setAcno(e.target.value);
  const uhandleAdharno = (e) => setAdharno(e.target.value);
  const uhandlePanno = (e) => setPanno(e.target.value);
  const uhandleNname = (e) => setNname(e.target.value);
  const uhandleNaddr = (e) => setNaddr(e.target.value);
  const uhandleNadharno = (e) => setNadharno(e.target.value);
  const uhandleNpanno = (e) => setNpanno(e.target.value);





  function getPentry(rid,name) {
    setRid(rid);
    setName(name);
    
    
    pentry(rid);
    handlePeShow();
}


  // Setting values for Update modal
  const getId = (
    id, name, uaddr, dob, gender, rddate, rdamt, occupation, acno, adharno, panno, nname, naddr, nadharno, npanno
  ) => {
    setRid(id);
    setName(name);
    setUaddr(uaddr);
    setDob(dob);
    setGender(gender);
    setRddate(rddate);
    setRdamt(rdamt);
    setOccupation(occupation);
    setAcno(acno);
    setAdharno(adharno);
    setPanno(panno);
    setNname(nname);
    setNaddr(naddr);
    setNadharno(nadharno);
    setNpanno(npanno);
    handleUShow();
  };

  // Function to open Passbook modal and set values
  const passbook = (rid, rddate, rdamt) => {
    setRid(rid);
    setRddate(rddate);
    setRdamt(rdamt);
    setLdt(""); // Reset to empty
    setFamt(""); // Reset to empty
    handlePShow();
  };


  const pentry = (id) => {
    axios.get("http://localhost:8080/rdpb/" + id)
    .then(res => {
      setPData(res.data);
        console.log(pdata);
        const total = res.data.reduce((sum, item) => sum + Number(item.rdamt), 0);

           console.log("Total Amount Paid:", total);
           setTotalAmt(total);
    })
}


  // Delete function
  const dlt = (id) => {
    axios.delete("http://localhost:8080/dlt/" + id)
      .then(res => {
        if (res.data.status === 200) {
          alert("Delete Success");
          rduser();
          setShow(false);
        } else {
          rduser();
        }
      });
  };

  // Save new user
  const save = () => {
    const dt = {
      name: name,
      addr: uaddr,
      acno: acno,
      adharno: adharno,
      occupation: occupation,
      dob: dob,
      gender: gender,
      naddr: naddr,
      nadharno: nadharno,
      nname: nname,
      npanno: npanno,
      panno: panno,
      rdamt: rdamt,
      rddate: rddate
    };

    axios.post('http://localhost:8080/save', dt)
      .then(res => {
        alert('success');
        rduser();
        setShow(false);
      });
  };

  // Save passbook entry (assuming a new endpoint; adjust if needed)
  const pbsave = () => {
    const dt = {
      rdamt: rdamt,
      flag:0,
      rid: rid,
      rddate: rddate,
      
      ldt: ldt,
      famt: famt
    };

    axios.post('http://localhost:8080/pbsave', dt) // Adjust endpoint as per your backend
      .then(res => {
        alert('Passbook entry saved successfully');
        rduser();
        handlePClose();
      })
      .catch(err => {
        alert('Error saving passbook entry');
      });
  };

  // Update user details
  const updateUser = () => {
    const dt = {
      rid: rid,
      name: name,
      addr: uaddr,
      acno: acno,
      adharno: adharno,
      occupation: occupation,
      dob: dob,
      gender: gender,
      naddr: naddr,
      nadharno: nadharno,
      nname: nname,
      npanno: npanno,
      panno: panno,
      rdamt: rdamt,
      rddate: rddate
    };

    axios.put('http://localhost:8080/updtp', dt)
      .then(res => {
        alert('Update Success');
        rduser();
        handleUClose();
      });
  };

  // Fetch user data
  const rduser = () => {
    axios.get("http://localhost:8080/rduser")
      .then(res => {
        setData(res.data); // Update the state with fetched data
      });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    rduser();
  }, []);

  return (
    <>
    <div className="container mt-3">
      <h2>RD USER DATA</h2>

      <Button variant="primary" onClick={handleShow}>
        Add New User
      </Button>

      {/* Passbook Modal */}
      <Modal show={pshow} onHide={handlePClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Passbook Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="number" value={rid} readOnly={true} placeholder="Rd User Id" />
          <br />
          <Form.Control type="date" value={rddate} onChange={phandleRddate} placeholder="Enter RD Date" />
          <br />
          <Form.Control type="number" value={rdamt} onChange={phandleRdamt} readOnly={true} placeholder="RD amount" />
          <br />
          <Form.Control type="number" value={ldt} onChange={phandleLdt} placeholder="Late Day" />
          <br />
          <Form.Control type="number" value={famt} onChange={phandleFamt} placeholder="Fine amount" />
          <br />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePClose}>
            Close
          </Button>
          <Button variant="primary" onClick={pbsave}>
            Passbook Entry
          </Button>
        </Modal.Footer>
      </Modal>



      {/* Passbook data show */}
      <Modal show={peshow} onHide={handlePeClose}size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>RD Passbook Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Id: {rid} | Name: {name}</p>
        <p>Total Amount : {totalAmt}</p>
        

          <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">RID</th>
            <th scope="col">PID</th>
            <th scope="col">RDAMT</th>
            <th scope="col">RDDATE</th>
            <th scope="col">LDAY</th>
            <th scope="col">FINE AMT</th>
          </tr>
        </thead>
        <tbody>
          {pdata && pdata.length > 0 ? (
            pdata.map((item) => (
              <tr key={item.rid}>
                <td>{item.rid}</td>
                <td>{item.pid}</td>
                <td>{item.rdamt}</td>
                <td>{item.rddate}</td>
                <td>{item.lday}</td>
                <td>{item.famt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePeClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={Ushow} onHide={handleUClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update RD User Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={name} onChange={uhandleName} placeholder="Enter a Name:" />
          <br />
          <Form.Control type="text" value={uaddr} onChange={uhandleUaddr} placeholder="Enter Your Address:" />
          <br />
          <Form.Control type="date" value={dob} onChange={uhandleDob} placeholder="Enter your DOB:" />
          <br />
          <Form.Control type="text" value={gender} onChange={uhandleGender} placeholder="Enter Gender" />
          <br />
          <Form.Control type="date" value={rddate} onChange={uhandleRddate} placeholder="Enter RD date:" />
          <br />
          <Form.Control type="number" value={rdamt} onChange={uhandleRdamt} placeholder="Enter RD Amount:" />
          <br />
          <Form.Control type="text" value={occupation} onChange={uhandleOccupation} placeholder="Enter Your Occupation" />
          <br />
          <Form.Control type="number" value={acno} onChange={uhandleAcno} placeholder="Enter Your Account Number" />
          <br />
          <Form.Control type="text" value={adharno} onChange={uhandleAdharno} placeholder="Enter Your Aadhar Number" />
          <br />
          <Form.Control type="text" value={panno} onChange={uhandlePanno} placeholder="Enter Your Pan Number" />
          <br />
          <Form.Control type="text" value={nname} onChange={uhandleNname} placeholder="Enter Nominee Name" />
          <br />
          <Form.Control type="text" value={naddr} onChange={uhandleNaddr} placeholder="Enter Nominee Address" />
          <br />
          <Form.Control type="text" value={nadharno} onChange={uhandleNadharno} placeholder="Enter Nominee Aadhar number" />
          <br />
          <Form.Control type="text" value={npanno} onChange={uhandleNpanno} placeholder="Enter Nominee Pan Number" />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Update RD User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New User Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" onChange={handleName} placeholder="Enter a Name:" />
          <br />
          <Form.Control type="text" onChange={handleUaddr} placeholder="Enter Your Address:" />
          <br />
          <Form.Control type="date" onChange={handleDob} placeholder="Enter your DOB:" />
          <br />
          <Form.Control type="text" onChange={handleGender} placeholder="Enter Gender" />
          <br />
          <Form.Control type="date" onChange={handleRddate} placeholder="Enter RD date:" />
          <br />
          <Form.Control type="number" onChange={handleRdamt} placeholder="Enter RD Amount:" />
          <br />
          <Form.Control type="text" onChange={handleOccupation} placeholder="Enter Your Occupation" />
          <br />
          <Form.Control type="number" onChange={handleAcno} placeholder="Enter Your Account Number" />
          <br />
          <Form.Control type="text" onChange={handleAdharno} placeholder="Enter Your Aadhar Number" />
          <br />
          <Form.Control type="text" onChange={handlePanno} placeholder="Enter Your Pan Number" />
          <br />
          <Form.Control type="text" onChange={handleNname} placeholder="Enter Nominee Name" />
          <br />
          <Form.Control type="text" onChange={handleNaddr} placeholder="Enter Nominee Address" />
          <br />
          <Form.Control type="text" onChange={handleNadharno} placeholder="Enter Nominee Aadhar number" />
          <br />
          <Form.Control type="text" onChange={handleNpanno} placeholder="Enter Nominee Pan Number" />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Add RD User
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">RID</th>
            <th scope="col">NAME</th>
            <th scope="col">ACNO</th>
            <th scope="col">ADHARNO</th>
            <th scope="col">PANNO</th>
            <th scope="col">RDAMT</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">RDDATE</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.rid}>
                <td>{item.rid}</td>
                <td>{item.name}</td>
                <td>{item.acno}</td>
                <td>{item.adharno}</td>
                <td>{item.panno}</td>
                <td>{item.rdamt}</td>
                <td>{item.addr}</td>
                <td>{item.rddate}</td>
                <td>
                  <Button variant="danger" onClick={() => dlt(item.rid)}>Delete</Button>
                  <Button variant="warning" onClick={() => getId(
                    item.rid, 
                    item.name, 
                    item.addr,
                    item.dob, 
                    item.gender,
                    item.rddate, 
                    item.rdamt, 
                    item.occupation,
                    item.acno, 
                    item.adharno, 
                    item.panno, 
                    item.nname, 
                    item.naddr,
                    item.nadharno, 
                    item.npanno
                  )}>Update</Button>
                  <Button variant="info" onClick={() => passbook(item.rid, item.rddate, item.rdamt)}>Passbook</Button>
                  <Button variant="info" onClick={() => getPentry(item.rid,item.name)}>Entries</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}