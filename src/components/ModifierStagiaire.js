
import React,{ useState } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateStagiaire = () => {
    const Navigate =useNavigate()
    const {id} = useParams();
const leGroup = [{'Nom_group':"WFS201"},{'Nom_group': "WFS202"},{'Nom_group': "WFS203"},{'Nom_group':"WFS204"},{'Nom_group':"WFS205"},{'Nom_group':"WFS206"},{'Nom_group':"WFS207"}, {'Nom_group':"WFS208"}, {'Nom_group':"WFS209"}]
const [userInfo, setuserInfo] = useState({
    nom:"",
    prenom:'',
    group: '',
    date:'',
    typeImg:'',
    chemin:''
});
// console.log(userInfo)
const handlefileChange = (e) => {
    const TotFiles = e.target.files
    if (TotFiles) {
        const GetFile0 = TotFiles[0] ? TotFiles[0] : "";
        const GetFileType = GetFile0.type ? GetFile0.type : "";
        const GetBinaryFile = new FileReader();
        GetBinaryFile.readAsBinaryString(GetFile0);
        GetBinaryFile.onload = (ev) => {
            setuserInfo({
                            ...userInfo,
                            typeImg:GetFileType,
                            chemin:btoa(ev.target.result)
                            });
        };
    }
}


const onChangeValue = (e) => {
    setuserInfo({
    ...userInfo,
    [e.target.name]:e.target.value
    });
} 
const FonSubmit = async(event) => {
    event.preventDefault();
                try {
            
                    event.persist();
                    
                    axios.post(`http://localhost/tp_stagiaires/ModifierStagiaire.php`,{ 
                        usernom: userInfo.nom ,
                        userprenom: userInfo.prenom,
                        usergroup: userInfo.group,
                        userdate: userInfo.date,
                        userchemin:  userInfo.chemin,
                        userTypeImage:userInfo.typeImg,
                        userids: id,
            
                    })
                    .then(res => {
                        // console.log(res.data);
                        Navigate(`/`);
                        return;
                    })
                } catch (error) { throw error;}    
};
    return (
        <>
                    <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h1>Create user</h1>
                    <form  onSubmit={FonSubmit}>
                            <div className="mb-3">
                                <label>Nom Stagiaire</label>
                                <input
                                type="text"
                                className="form-control"
                                name="nom"
                                onChange={onChangeValue}
                                
                                />
                            </div>
                            <div className="mb-3">
                                <label>Prenom Stagiaire</label>
                                <input
                                type="text"
                                className="form-control"
                                name="prenom"
                                onChange={onChangeValue}
                                />
                            </div>
                            <div className='parentInput'>
                                            <label htmlFor="" >Group : </label>
                                            <select className='select' name="group" id=""  onChange={onChangeValue}>
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
                                onChange={onChangeValue}
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