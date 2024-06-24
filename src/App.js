import './App.css';
import React, {useState,useEffect} from 'react'
function App() {
  const endpoint='https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
  const[member,setMembers]=useState([])
  const[currentPage,setCurrentPage]=useState(1)
  const itemsPerPage=10
  useEffect(() => {
    async function fetchData(){
      try{
        const response= await fetch(endpoint)
        const data= await response.json()
        setMembers(data)
      }
      catch(error){
        console.log("Error fetching members detail", error)
      }
    }
    fetchData()
  }, [])
  const indexOfLastItem=currentPage*itemsPerPage
  const indexOfFirstItem=indexOfLastItem-itemsPerPage
  const currentItems=member.slice(indexOfFirstItem,indexOfLastItem)
  const totalPages= Math.ceil(member.length/itemsPerPage)
  
  const handleNext=()=>{
    if(currentPage<totalPages){
      setCurrentPage(currentPage+1)
    }
    }
    const handlePrevious=()=>{
      if(currentPage>1){
        setCurrentPage(currentPage-1)
      }
      }
  
  
  return (
    <div className="App">
      <h1>
        EMPLOYEE DATA TABLE
      </h1>
      <table>
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ROLE</th>
        </thead>
        <tbody>
          {member.length>0?(
            currentItems.map((members)=>(
              <tr key={members.id}>
                <td>{members.id}</td>
                <td>{members.name}</td>
                <td>{members.email}</td>
                <td>{members.role}</td>
              </tr>
              
            ))
          ):<tr>
            <td>
              LOADING RESULT....
            </td>
            </tr>}
        </tbody>
      </table>
      <button onClick={handlePrevious} disabled={currentPage===1}>PREVIOUS</button>
      <span>{currentPage}</span>
      <button onClick={handleNext}>NEXT</button>

    </div>
  );
}

export default App;
