import React ,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Stagiaires = () => {
    const [resulta ,setResulta] = useState([])

    const Navigate = useNavigate()
    const GoToPageModify = (id_modifier) => {
        Navigate("/Modifier/"+ id_modifier)
    }

    useEffect( () => {
        getData();
    }, []);


    const getData = async ()=>{
        const GetData = await fetch('http://localhost/tp_stagiaires/GetStagiaires.php')
            const Data = await GetData.json();
            setResulta(Data)
            // console.log(Data);
    }



    const SupStagiaire = (id) => {
        if (window.confirm(`supprimer ce stagiaire ? oui ou no`)) {
            supprimerStagiaire(id);
            Navigate('/')
        }
    };


    const supprimerStagiaire = async (id) => {        
        try {
        axios.post(`http://localhost/tp_stagiaires/DeleteStagiaire.php`,{ 
            idSta: id,
        })
        .then(res => {
            getData();
            return;
        })
        } catch (error) { throw error;}    
    }
    return (
        
        <div className="row">
            <div className="col-12">
                <h1>List Users</h1>
                    <table className="table table-bordered table-striped" >
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>prenom</th>
                                                <th>date</th>
                                                <th>nom_group</th>
                                                <th>id_stagiaire</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>

                {
            resulta.map((item,index)=>{
                return (
                                    <tbody  key={index}>
                                        <tr>
                                            <td><img src={`data:${"image/" + item.type_img};base64,${item.Chemin_image}`} style={{width:"40px",borderRadius:"50%"}}  alt="" /></td>
                                            <td>{item.Nom_stag}</td>
                                            <td>{item.Nom_stag}</td>
                                            <td>{item.Date_naissance}</td>
                                            <td>{item.Nom_group}</td>
                                            <td>{item.Id_stag}</td>

                                            <td>
                                                <button className="btn" style={{backgroundColor:"green",color:"white",marginRight:"5px" }}  onClick={() => GoToPageModify(item.Id_stag)}>Modifier</button>
                                                <button className="btn"  style={{backgroundColor:"red",color:"white"}}  onClick={() => SupStagiaire(item.Id_stag)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    </tbody>


                    )
                    })
                }
            </table>



                        


            </div>
            </div>
    )
}

export default Stagiaires
