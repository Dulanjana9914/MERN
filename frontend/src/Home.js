import React, {useState,useEffect} from "react";
import axios from 'axios';



export default function Home() {
    
    
    const[request,setRequest] = useState([]);
   

    useEffect(()=>{

           
        axios.get("http://localhost:8070/recipe").then((res)=>{
                setRequest(res.data.existingRecipe);
            }).catch((err)=>{
                alert(err.message);
             })

    },[])


    const setData = (data) => {
        let {_id,recipe_name} = data;

        localStorage.setItem('recipeId',_id);
        localStorage.setItem('recipe_name', recipe_name);
        
        console.log(data);
        

}

    return (
        <div>
            
            <h1><b> <center> All Recipes</center> </b> </h1>

            <div className = "container">
            <div style={{display:"flex"}}>  
            <table className="table" style={{backgroundColor:"white"}}>

                <thead>
                        <tr>
                        <th scope="col">Recipe Name</th>
                        <th scope="col">   </th>
                        <th scope="col">   </th>                      
                        </tr>

                </thead>
                
            <tbody>
              {request.map((data,index)=>(
                        
                        <tr key={index}>
                            
                            
                            <td> <a onClick={() => setData(data)} href={`http://localhost:8070/recipe/details/${data._id}`} style={{textDecoration:'none'}}> 
                                 {data.recipe_name}</a></td>
                            
                           
                            <td>
                               
                                <a className="btn btn-warning" 
                                onClick={() => setData(data)}
                                href={`http://localhost:8070/recipe/details/${data._id}`}
                                style={{textDecoration:'none'}}>
                                <i></i>Edit
                                </a>
                                </td>

                                <td>
                                
                                <a className="btn btn-warning" 
                                onClick={() => setData(data)}
                                href={`/`}
                                style={{textDecoration:'none'}}>
                                <i></i>Delete
                                </a>
                                </td>

                        </tr>
                        

                ))}
                
                </tbody> 

            </table>
           

</div>  </div>
            
        </div>
    )
}
