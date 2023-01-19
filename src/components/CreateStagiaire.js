import React from 'react'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

import axios from "axios";
const CreateStagiaire = () => {
    const Navigate = useNavigate()

    const leGroup = [{'Nom_group':"WFS201"},{'Nom_group': "WFS202"},{'Nom_group': "WFS203"},{'Nom_group':"WFS204"},{'Nom_group':"WFS205"},{'Nom_group':"WFS206"},{'Nom_group':"WFS207"}, {'Nom_group':"WFS208"}, {'Nom_group':"WFS209"}]
    const [info_stag,setInfo_stag ] = useState({
        nom:"",
        prenom:'',
        NomGroup: '',
        date:'',
        typeImage:'',
        cheminImage:'',

    });
    // console.log(info_stag)

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios
        .post("http://localhost/tp_stagiaires/AddStagiaire.php",{
            usernom: info_stag.nom ,
            userprenom: info_stag.prenom,
            usergroup: info_stag.NomGroup,
            userdate: info_stag.date,
            userTypeImage:info_stag.typeImage,
            userchemin:  info_stag.cheminImage,
            // id:id
        })
        .then(function (response) {
        // console.log(response.data);
        Navigate("/");
        });
    }
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInfo_stag((values)=> ({...values,[name]:value}))
    }
    // console.log(inputs)


    const handlefileChange = (e) => {
        const TotFiles = e.target.files
        if (TotFiles) {
            const GetFile0 = TotFiles[0] ? TotFiles[0] : "";
            // console.log(GetFile0)

            const GetFileType = GetFile0.type ? GetFile0.type : "";
            const GetBinaryFile = new FileReader();
            GetBinaryFile.readAsBinaryString(GetFile0);
            GetBinaryFile.onload = (ev) => {
                setInfo_stag({
                                ...info_stag,
                                typeImage:GetFileType,
                                cheminImage:btoa(ev.target.result)
                                });


                // setBinaryFile();
            };
        }
    }



    return (
        <>
                    <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h1>Create user</h1>
                    <form  onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Nom Stagiaire</label>
                                <input
                                type="text"
                                className="form-control"
                                name="nom"
                                onChange={handleChange}
                                
                                />
                            </div>
                            <div className="mb-3">
                                <label>Prenom Stagiaire</label>
                                <input
                                type="text"
                                className="form-control"
                                name="prenom"
                                onChange={handleChange}
                                />
                            </div>
                            <div className='parentInput'>
                                            <label htmlFor="" >Group : </label>
                                            <select className='select' name="NomGroup" id=""  onChange={handleChange}>
                                                <option value="" style={{textAlign:"center"}}>List group</option>

                                                {
                                                    // eslint-disable-next-line array-callback-return

                                                    leGroup.map(((item,index)=>{
                                                        
                                                        return(
                                                                <option  style={{textAlign:"center"}} value={item.Nom_group} key={index}>{item.Nom_group}</option>
                                                        )
                                                    }))
                                                }
                                            </select>
                            </div>
                            <div className="mb-3">
                                <label>date nissance</label>
                                <input
                                type="date"
                                className="form-control"
                                name="date"
                                onChange={handleChange}
                                />
                            </div>
                            <div >
                                            <label htmlFor="">Chemin_image :</label>
                                            <input type="file" style={{width:"50%",padding:"2px"}}  name="chemin"   onChange={handlefileChange} />
                            </div>

                            <button type="submit" name="add" className="btn btn-primary">
                                Save
                            </button>
                    </form>
                </div>
                <div className="col-2"></div>
                </div>
        </>
    )
}

export default CreateStagiaire