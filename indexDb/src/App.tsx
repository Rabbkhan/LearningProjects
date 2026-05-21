import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DB_NAME = "testDB";
const version = 1;


const App = () => {

const [status, setStatus] = useState("idle");


  const dbConnect = ():Promise<IDBDatabase> => {
    // alert("Database Connected");

    return new Promise((resolve, reject) => {


      const req = indexedDB.open(DB_NAME, version)
      req.onupgradeneeded = () => {
        const db = req.result;
        const payload: IDBObjectStoreParameters = {
          keyPath: "id",
          autoIncrement: true
        }

        db.createObjectStore("users", payload)
        db.createObjectStore("employees", payload)
        db.createObjectStore("salaries", payload)
        db.createObjectStore("payments", payload)

      }

      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)

    })
  }


  const storeData = async () => {

    try {
      const db = await dbConnect();
      const tx = db.transaction("users", "readwrite");
      const payload = {
        name: "John Doe",
        email: "john@gmail.com"
      }

      const store = tx.objectStore("users")
      const request = store.add(payload)
      request.onsuccess = () => {
        toast.success("Data stored successfully!")
      }
       request.onerror = () => {
      toast.error("Error storing data!")
    }
    }
    catch (error) {
         toast.error("Error storing data!")


    }
  }


  const fetchData = async () => {

    try {
      const db = await dbConnect();
      const tx = db.transaction("users", "readonly");
      const store = tx.objectStore("users")
      const request = store.getAll()
      request.onsuccess = () =>{
        console.log(request.result);
        
      }
      request.onerror =()=>{
        console.log(request.result);
        
      }

    } catch (error) {
      toast.error("Error fetching data!")
    }
  }


  const updateData = async () => {
try {
  const db = await dbConnect();
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users")
  const request = store.get(11)
  request.onsuccess = () =>{
    const data = request.result;
    if(data){
      data.name = "khan"
      const updateRequest = store.put(data)
      updateRequest.onsuccess = () => {
        toast.success("Data updated successfully!")
      }
      updateRequest.onerror = () => {
        toast.error("Error updating data!")
      }
    }else{
      toast.error("Data not found!")
    }
  }
   request.onerror = () => {
    toast.error("Error fetching data for update!")
  }   
} catch (error) {
  toast.error("Error updating data!")
}
  }


  const deleteData = async () => {

 try {
     const db = await dbConnect();
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users")
    const request = store.delete(11)
request.onsuccess = () => {
  toast.success("Data deleted successfully!")
}
request.onerror = () => {
  toast.error("Error deleting data!")
}  
 } catch (error) {
  toast.error("Error deleting data!")
 } 


  }

  return (



    <div className="p-16 space-y-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={storeData}>
          Store Data
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={fetchData}>
          Fetch Data
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={updateData}>
          Update Data
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={deleteData}>
          Delete Data
        </button>
      </div>
      <div className="rounded border border-slate-300 bg-slate-50 p-4 text-slate-800">
        <strong>Status:</strong> {status}
      </div>


    </div>
  )
}

export default App