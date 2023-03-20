import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Table } from 'semantic-ui-react';
import "./style.css";
import Swal from 'sweetalert2';

import {BASE_URL} from '../services/helper'
import Navbar from './Navbar/Navbar';

function Home() {
    const [media,setMedia] = useState([]);
    let [ID,setID] = useState(null);
    
    const [favourite,setFavourite] = useState("")
    setID = (id)=>{
        sessionStorage.setItem("ID",id)
    }
   
    useEffect(()=>{
         axios.get(`${BASE_URL}/api/v1/insights`)
        .then(({data})=>{
        setMedia(data.insights) 
        })
    },[])


    const onDelete = (id) => {
        axios.delete(`${BASE_URL}/api/v1/insight/${id}`)
          .then(() => {
            window.location.reload();
          })
      }

      const confDelete =(id)=>{
        Swal.fire({
          title: 'Are you sure want delete this Insight ?',
          showDenyButton: true,
          
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Deleted Successfully', '', 'success');
            onDelete(id)
          } else if (result.isDenied) {
            Swal.fire('Cancelled', '', 'info')
          }
        })
      }
  
      useEffect(()=>{
        setID(sessionStorage.getItem("ID"));
      })
     

      
    const updateFav = async ()=>{

      const favData = {
        "favourite":favourite
      }
       
        await axios.put(`${BASE_URL}/api/v1/insight/${ID}`,favData).then((data)=>{
           
            window.location.reload();
        }).catch((error)=>{
            console.log(error.message);
        })
    }
    
  return (
    <div className=''>
      <Navbar/>
        <div className='table'>
          
       <h3>Results</h3>
<Table celled >

        <Table.Header>

          <Table.Row>
            <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Website Url</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>WordCount</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>favourite</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>linkUrls</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>mediaUrls</Table.HeaderCell>
            <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
     {Array.isArray(media)
     ? media.map(data=>{
      return(
        <Table.Row className='rows' >
           
           <Table.Cell>{data.url}</Table.Cell>
           <Table.Cell>{data.count}</Table.Cell>
           <Table.Cell>{data.favourite?"TRUE":"FALSE"}</Table.Cell>
           <Table.Cell  >{data.linkUrls.map(item=>{return(<div><a href={item}>{item}</a><br/></div>)})}</Table.Cell>
           <Table.Cell textAlign='left'>{data.mediaUrls.map(item=>{return(<div><li>{item}</li></div>)})}</Table.Cell>
          
           <Table.Cell>
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FF0000", color:"#ffffff", fontSize:10, borderColor:"#FFC300"}}  onClick={()=>confDelete(data._id)}>Remove</Button> </span>
             
              <span><Button variant="primary" type="submit" style={{backgroundColor:"#FFC300", color:"#ffffff", fontSize:10, borderColor:"#FF0000"}} onClick={()=>updateFav(data._id)} >Add to Fav</Button></span>
          
              </Table.Cell>
         
           
              
        </Table.Row>
      )

     }): null}
    </Table.Body>

      </Table>


    </div>
    </div>
  )
}

export default Home