import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import validator from 'validator'
import InputMask from 'react-input-mask'
import moment from 'moment'
import { 
  Typography, 
  Button, 
  Container, 
  makeStyles, 
  withStyles,
  createTheme,
  CssBaseline,
  ThemeProvider,
  TextField, 
  FormControl,
  Grid,
  Link, 
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Visibility, VisibilityOff } from "@material-ui/icons"

const useStyle = makeStyles({
  field: {
    
    display: 'block',
    //borderColor: '#80AFD0',
  },
  btn: {
    margin: '16px 0px'
  },
  select: {
    margin: '0px',
    minWidth: '100%',
  }
})
//gender select
const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: '#80AFD0',
      borderWidth: 2,
    },
    "&:hover $notchedOutline": {
      borderColor: '#80AFD0',
      borderWidth: 2,
    },
    "&$focused $notchedOutline": {
      borderColor: '#80AFD0',
      borderWidth: 2,
    }
  },
  focused: {},
  notchedOutline: {}
}));

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
         body: {
           background: 'linear-gradient(to right, #00121b, #022F46, #00121b)',
           backgroundRepeat: "no-repeat",
           backgroundAttachment: "fixed",
        },
      },
    },
    //all text field
    MuiTextField: {
      root: {
        '& input:valid + fieldset': {
          borderColor: '#80AFD0',
          borderWidth: 2,
        },
        '& input:invalid + fieldset': {
          borderColor: '#80AFD0',
          borderWidth: 2,
        },
      },
    },
    //for password because for some reason the endAdornments mess up the styling and it took me 6 hours to figure out
    MuiOutlinedInput: {
      
      root: {
        
        "& $notchedOutline": {
          borderColor: '#80AFD0',
          borderWidth: 2
        },
        "&:hover $notchedOutline": {
          borderColor: '#80AFD0',
          borderWidth: 2,
        },
        "&$focused $notchedOutline": {
          borderColor: '#80AFD0',
          borderWidth: 2,
        },
        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
          color: '#80AFD0'
        },
        "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
          color: '#80AFD0',
        },
        "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
          color: '#80AFD0',
        },
      }
    }
  },
  palette: {
    background: {
      //default: "",
      paper: "#022F46"
    },
    primary: {
      dark: '#022F46',
      main: '#80AFD0',
      light: '#C3D9E9',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#80AFD0'
    }, 
    text: {
      primary: '#80AFD0',
      secondary: '#80AFD0',
    },
    
  }
})

const FormMenuItem = withStyles({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.light,
      // '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      //   color: theme.palette.common.black,
      // },
    },
  },
})(MenuItem);

const Index = () => {

  const classes = useStyle()
  const outlinedInputClasses = useOutlinedInputStyles()

  const [firstname, setFirstname] = useState('')
  const [firstnameError, setFirstnameError] = useState(false)
  const [firstnameHelper, setFirstnameHelper] = useState('')
  const [lastname, setLastname] = useState('')
  const [lastnameError, setLastnameError] = useState(false)
  const [lastnameHelper, setLastnameHelper] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailHelper, setEmailHelper] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [phonenumberError, setPhonenumberError] = useState(false)
  const [phonenumberHelper, setPhonenumberHelper] = useState('')
  const [birthday, setBirthday] = useState('')
  const [birthdayError, setBirthdayError] = useState(false)
  const [birthdayHelper, setBirthdayHelper] = useState('')
  const [gender, setGender] = useState('')
  //const [genderError, setGenderError] = useState(false)
  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState(false)
  const [zipCodeHelper, setZipCodeHelper] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelper, setPasswordHelper] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState(false)
  const [passwordConfirmHelper, setPasswordConfirmHelper] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFirstnameError(false)
    setLastnameError(false)
    setEmailError(false)
    setPhonenumberError(false)
    setBirthdayError(false)
    setZipCodeError(false)
    setPasswordError(false)
    setPasswordConfirmError(false)
    //convert format to just numbers
    var number = phonenumber.replace(/\D/g, "")
    //gets valid age
    var validAge = moment().subtract(18, "years")
    var dob = moment(birthday)
    //zip code regular expression
    var zipCodeRegEx = /^\d{5}$|^\d{5}-\d{4}$/
    //password regular expression
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

    if (firstname === '') {
      setFirstnameError(true)
    }

    if (lastname === '') {
      setLastnameError(true)
    }

    if (!(validator.isEmail(email))){
      setEmailError(true)
    }

    if(!(validator.isMobilePhone(number, 'en-US'))){
      setPhonenumberError(true)
    }

    if (!dob.isValid()){
      setBirthdayError(true)
    }else if(!validAge.isAfter(dob)){
      setBirthdayError(true)
    }

    if(!zipCodeRegEx.test(zipCode)){
      setZipCodeError(true)
    }

    if(!passwordRegEx.test(password)){
      setPasswordError(true)
    }

    if((password !== passwordConfirm) || passwordConfirm === ''){
      setPasswordConfirmError(true)
    }

    //check for no errors
    if(!firstnameError && !lastnameError && !emailError && !phonenumberError && !birthdayError && !zipCodeError && !passwordError && !passwordConfirmError) {
      console.log({
        "First Name: ": firstname, 
        "Last Name: ": lastname, 
        "Email: ": email, 
        "Birthday: ": birthday, 
        "Gender: ": gender, 
        "Phone Number: ": "+1"+number, 
        "Zip Code: ": zipCode, 
        "Password: ": password,
      })
    }else{
      console.warn("Error: Data not sent!")
    }
  }

  return (
    <div>
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <Container component="main" maxWidth="xs">
          <div style={{display: "flex", justifyContent: "center", margin: "16px"}}>
            <StaticImage 
              src="../images/LogoSmall.png"
              alt="GameSafe Logo"
              loading="eager"
              placeholder="tracedSVG"
              objectPosition="50% 50%"
            />
          </div>
          
          <Typography 
            variant="h4"
            color="primary"
            align="center"
            gutterBottom
          >
            GameSafe Registration
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  onChange={(e) => {
                    setFirstname(e.target.value)
                    if(e.target.value.length < 2){
                      setFirstnameError(true)
                      setFirstnameHelper("Minimum of two characters")
                    }else{
                      setFirstnameError(false)
                      setFirstnameHelper('')
                    }
                  }}
                  name="firstName"
                  variant="outlined" 
                  label="First Name" 
                  color="primary" 
                  id="firstName"
                  helperText={firstnameHelper}
                  fullWidth
                  required 
                  inputProps={{
                    maxLength: 64,
                    minLength: 3
                  }}
                  className={classes.field}
                  error={firstnameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  onChange={(e) => {
                    setLastname(e.target.value)
                    if(e.target.value.length < 2){
                      setLastnameError(true)
                      setLastnameHelper("Minimum of two characters")
                    }else{
                      setLastnameError(false)
                      setLastnameHelper('')
                    }
                  }}
                  name="lastName"
                  variant="outlined" 
                  label="Last Name" 
                  color="primary" 
                  id="lastName"
                  helperText={lastnameHelper}
                  fullWidth
                  required 
                  inputProps={{
                    maxLength: 64,
                    minLength: 3
                  }}
                  className={classes.field}
                  error={lastnameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e) => {
                    if (validator.isEmail(e.target.value)){
                      setEmail(e.target.value)
                      setEmailError(false)
                      setEmailHelper("")
                    }else{
                      setEmailError(true)
                      setEmailHelper("Enter a valid email address")
                    }
                  }}
                  name="email"
                  variant="outlined" 
                  label="Email Address" 
                  color="primary" 
                  id="email"
                  type="email"
                  helperText={emailHelper}
                  //autoComplete="email"
                  fullWidth
                  required 
                  className={classes.field}
                  error={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <InputMask
                  mask="( 999 ) 999 - 9999"
                  value={phonenumber}
                  onChange={(e) => {
                    var number = e.target.value.replace(/\D/g, "")
                    setPhonenumber(number)
                    if(validator.isMobilePhone(number, 'en-US')){
                      setPhonenumberError(false)
                      setPhonenumberHelper("")
                    }else{
                      setPhonenumberError(true)
                      setPhonenumberHelper("Enter a valid phone number")
                    }
                  }}
                >
                  {() => <TextField 
                    
                    name="phonenumber"
                    variant="outlined" 
                    label="Phone Number"
                    helperText={phonenumberHelper}
                    color="primary" 
                    id="phonenumber"
                    fullWidth
                    required 
                    className={classes.field}
                    error={phonenumberError}
                  />}
                </InputMask>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  onChange={(e) => {
                    setBirthday(e.target.value)
                    var validAge = moment().subtract(18, "years")
                    var dob = moment(e.target.value)

                    if (!dob.isValid()){
                      setBirthdayError(true)
                    }else if(validAge.isAfter(dob)){
                      setBirthdayError(false)
                      setBirthdayHelper("")
                    }else{
                      setBirthdayError(true)
                      setBirthdayHelper("You must be over 18")
                    }
                                        
                  }}
                  name="birthday"
                  variant="outlined" 
                  label="Birthday"
                  color="primary" 
                  id="birthday"
                  helperText={birthdayHelper}
                  type="date"
                  fullWidth
                  required 
                  className={classes.field}
                  
                  error={birthdayError}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl 
                  component="fieldset" 
                  variant="outlined" 
                  className={classes.select}
                  fullWidth

                >
                  <InputLabel htmlFor="gender-select-label">Gender (Optional)</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={gender}
                    //variant="outlined"
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender (Optional)"
                    input={
                      <OutlinedInput
                        labelWidth={140}
                        name="gender"
                        id="gender-select-label"
                        classes={outlinedInputClasses}
                      />
                    }
                  >
                    <FormMenuItem value="">None</FormMenuItem>
                    <FormMenuItem value="Male">Male</FormMenuItem>
                    <FormMenuItem value="Female">Female</FormMenuItem>
                    <FormMenuItem value="Other">Other</FormMenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e) => {
                    setZipCode(e.target.value)
                    var zipCodeRegEx = /^\d{5}$|^\d{5}-\d{4}$/
                    if(zipCodeRegEx.test(e.target.value)){
                      setZipCodeError(false)
                      setZipCodeHelper('')
                    }else{
                      setZipCodeError(true)
                      setZipCodeHelper("Enter a valid Zip Code")
                    }
                  }}
                  name="zipCode"
                  variant="outlined" 
                  label="Zip Code" 
                  color="primary" 
                  id="zipCode"
                  helperText={zipCodeHelper}
                  fullWidth
                  required 
                  className={classes.field}
                  error={zipCodeError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e) => {
                    setPassword(e.target.value)
                    //const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
                    const lengthRegEx = /.{8,}/
                    const numRegEx = /\d/g
                    const specialRegEx = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
                    const upperRegEx = /[A-Z]/
                    const lowerRegEx = /[a-z]/
                    if(!lengthRegEx.test(e.target.value)){
                      setPasswordError(true)
                      setPasswordHelper("8 characters minimum")
                    }else if(!numRegEx.test(e.target.value)){
                      setPasswordError(true)
                      setPasswordHelper("Minimum of one number")
                    }else if(!specialRegEx.test(e.target.value)){
                      setPasswordError(true)
                      setPasswordHelper("Minimum of one special character")
                    }else if(!upperRegEx.test(e.target.value)){
                      setPasswordError(true)
                      setPasswordHelper("Minimum of one uppercase letter")
                    }else if(!lowerRegEx.test(e.target.value)){
                      setPasswordError(true)
                      setPasswordHelper("Minimum of one lowercase letter")
                    }else{
                      setPasswordError(false)
                      setPasswordHelper("")
                    }
                  }}
                  name="password"
                  variant="outlined" 
                  label="Password" 
                  type={showPassword ? "text" : "password"}
                  color="primary" 
                  id="password"
                  helperText={passwordHelper}
                  fullWidth
                  required 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment 
                        position="end"
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  className={classes.field}
                  error={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value)
                    //console.log(`Value ${e.target.value}\nPassword ${password} \nConfirm ${passwordConfirm}`)
                    if(password !== e.target.value){
                      
                      setPasswordConfirmError(true)
                      setPasswordConfirmHelper('Passwords do not match')
                    }else{
                      setPasswordConfirmError(false)
                      setPasswordConfirmHelper('')

                    }
                  }}
                  name="passwordConfirm"
                  variant="outlined" 
                  label="Confirm Password" 
                  type={showPassword ? "text" : "password"}
                  color="primary" 
                  id="passwordConfirm"
                  helperText={passwordConfirmHelper}
                  fullWidth
                  required 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  className={classes.field}
                  error={passwordConfirmError}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Typography variant="body1" color="primary" style={{marginTop: '16px'}}>
                  By clicking Sign Up, you are agreeing to the <Link href="https://www.freeprivacypolicy.com/live/33a7b5a5-843e-4b4c-b3fc-dc68322c7b3e" style={{color: '#0957af'}}>Terms of Use</Link> including the arbitration clause and you are acknowledging the <Link href="https://www.freeprivacypolicy.com/live/d141a082-710a-46c4-8e0d-c43e04205ac0" style={{color: '#0957af'}}>Privacy Policy</Link>.
                </Typography>
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              className={classes.btn}
              endIcon={<KeyboardArrowRightIcon/>}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>


          
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default Index;