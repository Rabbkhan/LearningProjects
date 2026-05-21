
const DB_NAME = "testDB";
const version = 1;


const App = () => {



  const dbConnect = () => {
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
  return (


    <div className="p-16">

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={dbConnect}>Connect to Database</button>


    </div>
  )
}

export default App