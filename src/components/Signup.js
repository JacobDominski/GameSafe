import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useState } from "react"
import UserPool from "../mock/UserPool";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        let attributeList = [];

        let attributeBirthday = new CognitoUserAttribute({Name: "birthdate", Value: birthday})
        let attributeGender = new CognitoUserAttribute({Name: "gender", Value: gender})
        let attributePhoneNumber = new CognitoUserAttribute({Name: "phone_number", Value: phonenumber})
        let attributeFirstName = new CognitoUserAttribute({Name: "given_name", Value: firstname})
        let attributeLastName = new CognitoUserAttribute({Name: "family_name", Value: lastname})

        attributeList.push(attributeBirthday)
        attributeList.push(attributeGender)
        attributeList.push(attributePhoneNumber)
        attributeList.push(attributeFirstName)
        attributeList.push(attributeLastName)

        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if(err){
                console.error(err)
            }
            console.log(data)
        })
    }

    return (
        <div>
            <form 
                autoComplete="on"
                onSubmit={onSubmit}
            >
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                ></input><br/>
                <label htmlFor="birthday">Birthday: </label>
                <input
                    type="text"
                    value={birthday}
                    onChange={(event)=>setBirthday(event.target.value)}
                ></input><br/>
                <label htmlFor="gender">Gender: </label>
                <input
                    type="text"
                    value={gender}
                    onChange={(event)=>setGender(event.target.value)}
                ></input><br/>
                <label htmlFor="phonenumber">Phone Number: </label>
                <input
                    type="text"
                    value={phonenumber}
                    onChange={(event)=>setPhonenumber(event.target.value)}
                ></input><br/>
                <label htmlFor="firstname">First Name: </label>
                <input
                    type="text"
                    value={firstname}
                    onChange={(event)=>setFirstname(event.target.value)}
                ></input><br/>
                <label htmlFor="lastname">Last Name: </label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(event)=>setLastname(event.target.value)}
                ></input><br/>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                ></input><br/>
                <label>By clicking Sign Up, you are agreeing to the Terms 
                        of Use including the arbitration clause and you are 
                        acknowledging the Privacy Policy</label><br/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup