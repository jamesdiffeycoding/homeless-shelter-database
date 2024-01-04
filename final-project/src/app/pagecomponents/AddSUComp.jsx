import compStyles from "./addsu.css";
import Link from "next/link";
import { useEffect, useState } from "react";
// Make sure to npm i to install Toast package
import { toast } from "sonner";
import { supabase } from "../AuthRouter";
import { z } from "zod";



//, last_name:"", age:"", gender:"", dob:"", ni_number:"", phone:"", emergency_contact_name:"", emergency_contact_relationship:"", email:"", emergency_contact_phone:""
//, last_name, age, gender, dob, ni_number, phone, emergency_contact_name, emergency_contact_relationship, email, emergency_contact_phone

export default function AddSUComp({ staffId, staffName }) {
  // FETCH
  const [fetchedDataProfile, setFetchedDataProfile] = useState([]);
  const [ShowMessage, setShowMessage] = useState("false");
  async function fetchDataProfile() {
    const { data } = await supabase.from("service_users").select();
    setFetchedDataProfile(data);
  }
  useEffect(() => {
    fetchDataProfile("service-users");
  }, []);
  // INPUT SETUP ________________________________________________________________
  // let userIDForAdding = ""
  const profileColumnsBlank = {
    first_name: "",
    last_name: "",
    age: undefined,
    gender: "",
    dob: "",
    ni_number: "",
    phone: "",
    accomodation_needs: "",
    languages: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    email: "",
    emergency_contact_phone: "",
    su_image: "",
  };
  
  const profileColumnsSchema = z.object({
    first_name: z.string({ message: "First Name is required" }),
    last_name: z.string({ message: "Last Name is required" }),
    age: z.number().min(18).max(120).optional(),
    gender: z.string().optional(),
    dob: z.date().optional(),
    ni_number: z.string().length(9).optional(),
    phone: z.string().regex(/^\d{11}$/, { message: "Must contain exactly 11 numbers" }).optional(),
    accomodation_needs: z.string().optional(),
    languages: z.string().optional(),
    emergency_contact_name: z.string().optional(),
    emergency_contact_relationship: z.string().optional(),
    email: z.string().email().optional(),
    emergency_contact_phone: z.string().regex(/^\d{11}$/, { message: "Must contain exactly 11 numbers" }).optional(),
    su_image: z.string().optional(),
  });
  
  // 2 input state
  const [inputProfile, setInputProfile] = useState(profileColumnsBlank);
  // 3 destructuring input state
  const {
    first_name,
    last_name,
    age,
    gender,
    dob,
    ni_number,
    phone,
    accomodation_needs,
    languages,
    emergency_contact_name,
    emergency_contact_relationship,
    email,
    emergency_contact_phone,
    su_image,
  } = inputProfile;
  // 4 destructuring columns
  const profileColumns = {
    first_name,
    last_name,
    age,
    gender,
    dob,
    ni_number,
    phone,
    accomodation_needs,
    languages,
    emergency_contact_name,
    emergency_contact_relationship,
    email,
    emergency_contact_phone,
    su_image,
  };



  // input- strengths _____________________
  // 1 blank columns
  // const strengthsColumnsBlank = {strengths_id:"", user_id:"", strengths_text_one:"", strengths_text_two:"", strengths_text_three:""};
  // 2 input state
  // const [inputStrengths, setInputStrengths] = useState(strengthsColumnsBlank)
  // 3 destructuring input state
  // const {strengths_id, user_id, strengths_text_one, strengths_text_two, strengths_text_three} = inputStrengths
  // 4 destructuring columns
  // const strengthsColumns = {strengths_id, user_id:{userIDForAdding}, strengths_text_one, strengths_text_two, strengths_text_three};

  // input- medical _____________________
  // 1 blank columns
  const medicalColumnsBlank = {
    medical_id: "",
    nhs_number: "",
    mental_health_disclosures: "",
    physical_health_disclosures: "",
    substance_abuse_disclosures: "",
    registered_medical_practice: "",
    blood_type: "",
    allergies: "",
    medication: "",
  };
  // 2 input state
  const [inputMedical, setInputMedical] = useState(medicalColumnsBlank);
  // 3 destructuring input state
  const {
    medical_id,
    nhs_number,
    mental_health_disclosures,
    physical_health_disclosures,
    substance_abuse_disclosures,
    registered_medical_practice,
    blood_type,
    allergies,
    medication,
  } = inputMedical;
  // 4 destructuring columns
  const medicalColumns = {
    medical_id,
    nhs_number,
    mental_health_disclosures,
    physical_health_disclosures,
    substance_abuse_disclosures,
    registered_medical_practice,
    blood_type,
    allergies,
    medication,
  };
  // input-employment history _____________________
  // 1 blank columns
  const employmentStatusColumnsBlank = {
    employment_id: "",
    job_description: "",
    start_date: "",
    end_date: "",
  };
  // 2 input state
  const [inputEmploymentStatus, setInputEmploymentStatus] = useState(
    employmentStatusColumnsBlank
  );
  // 3 destructuring input state
  const { employment_id, job_description, start_date, end_date } =
    inputEmploymentStatus;
  // 4 destructuring columns
  const employmentStatusColumns = {
    employment_id,
    job_description,
    start_date,
    end_date,
  };
  // input-comments history _____________________
  // 1 blank columns
  const commentsColumnsBlank = {
    comment_id: "",
    comment_text: "",
    comment_date: "",
    staff_id: staffId,
    staff_name: staffName,
  };
  // 2 input state
  const [inputComments, setInputComments] = useState(commentsColumnsBlank);
  // 3 destructuring input state
  const { comment_id, comment_text, comment_date } = inputComments;
  // 4 destructuring columns
  const commentsColumn = {
    comment_id,
    comment_text,
  };
  // input-residence history _____________________
  // 1 blank columns
  const residenceColumnsBlank = {
    date_entry: "",
    current_status: "",
    previous_stays: "",
  };
  // 2 input state
  const [inputResidence, setInputResidence] = useState(residenceColumnsBlank);
  // 3 destructuring input state
  const { date_entry, current_status, previous_stays } = inputResidence;
  // 4 destructuring columns
  const residenceColumn = {
    date_entry,
    current_status,
    previous_stays,
  };

  // Function to reset all input fields
const resetInputFields = () => {
  setInputProfile(profileColumnsBlank); 
  // setInputMedical(medicalColumnsBlank);
  // setInputEmploymentStatus(employmentStatusColumnsBlank);
  // setInputComments(commentsColumnsBlank);
  // setInputResidence(residenceColumnsBlank);
};
  

  // SUBMIT POST FUNCTION
  async function submitPost(tableName, columns, columnsBlank, isProfile) {
    try{
    const { data, error } = await supabase
      .from(tableName)
      .insert(columns)
      .single()
      .select();
      const suName = data.first_name + " " + data.last_name;
      let success = true;
      toast("Success", {
        className: "submit-toast",
        description: `Service User ${suName} Successfully Added`,
        duration: 3000,
        position: "top-left",
        // onAutoClose: window.location.reload(), //will reload page(after toast disappears)
        style: {
          background: "#B3F5A3",
          color: "black",
          border: "3px solid white",
        },
        
      });
      // This function will refresh the page after 4 seconds, clearing the input fields
      //setTimeout(function () {
        // Refresh the page
        //window.location.reload();
      //}, 4000); // Adjust the delay time
      //instead have chosen to reset the fields using state
      resetInputFields()

    // if(isProfile) {userIDForAdding = data.user_id};
    // console.log(userIDForAdding)
    setFetchedDataProfile(columnsBlank);
    fetchDataProfile();
    } catch {
    console.error("error creating record")
    toast("Error", {
      className: "error-toast",
      description: `Could not create service user`,
      duration: 3000,
      position: "top-left",
      //onAutoClose: window.location.reload(), //will reload page(after toast disappears)
      style: {
        background: "#B3F5A3",
        color: "red",
        border: "3px solid white",
      },
      
    });
    }
  }
 

  return (
    <>
      {/* WELCOME BOX */}
      <section className="global-welcome">
          <h1 className="global-heading">Add a new service user</h1>
          <p className="global-description">You can then edit their full profile in the database</p>
        </section>
      {/* CONTENT BOX */}
      <section className="global-content">
              {/* PROFILE INPUTS _________________________________________________________________________________________ */}
      {/* PROFILE - first name */}
      <form className="addsu-form" id="myform">
        <div className="addsu-inputcontainer">
          <label
            htmlFor="first_name"
            className="addsu-labeltext"
            id="first_name_label"
          >
            First Name:{" "}
          </label>
          <input
            type="text"
            className="addsu-inputfield"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            value={first_name}
            required
            // This event handler updates the inputProfile state with the value of the 'first_name' field when it changes
            onChange={(e) =>
              setInputProfile({ ...inputProfile, first_name: e.target.value })
            }
          />
        </div>

        {/* PROFILE - last_name */}
        <div className="addsu-inputcontainer">
          <label htmlFor="last_name" id="last_name_label" className="addsu-labeltext">
            Last Name:{" "}
          </label>
          <input
            type="text"
            placeholder="Last Name"
            id="last_name"
            className="addsu-inputfield"
            name="last_name"
            value={last_name}
            required
            onChange={(e) =>
              setInputProfile({ ...inputProfile, last_name: e.target.value })
            }
          />
        </div>

        {/* PROFILE - age */}
        <div className="addsu-inputcontainer">
          <label htmlFor="age" id="age_label" className="addsu-labeltext">
            Age:{" "}
          </label>
          <input
            type="number"
            id="age"
            className="addsu-inputfield"
            name="age"
            min={18}
            max={120}
            value={age ?? ''}
            onChange={(e) =>
              setInputProfile({ ...inputProfile, age: e.target.value })
            }
          />
        </div>

        {/* PROFILE - gender */}
        <div className="addsu-inputcontainer">
          <label htmlFor="gender" id="gender_label" className="addsu-labeltext">
            Gender:{" "}
          </label>
          <input
            placeholder="Gender"
            name="gender"
            id="gender"
            className="addsu-inputfield"
            value={gender}
            onChange={(e) =>
              setInputProfile({ ...inputProfile, gender: e.target.value })
            }
          />
        </div>

        {/* PROFILE - dob */}
        <div className="addsu-inputcontainer">
          <label htmlFor="dob" className="addsu-labeltext" id="dob_label">
            DOB:{" "}
          </label>
          <input
            type="date"
            name="dob"
            // Min max dates are set to prevent users from entering dates that are too far in the past or future
            min={"1900-01-01"}
            max={"2040-12-18"}
            className="addsu-inputfield"
            id="dob"
            value={dob}
            onChange={(e) =>
              setInputProfile({ ...inputProfile, dob: e.target.value })
            }
          />
        </div>

        {/* PROFILE - ni_number */}
        <div className="addsu-inputcontainer">
          <label htmlFor="ni_number" id="ni_number_label" className="addsu-labeltext">
            NI Number:{" "}
          </label>
          <input
            placeholder="NI Number"
            value={ni_number}
            type="text"
            className="addsu-inputfield"
            id="ni_number"
            //Pattern means NI number must be in the format of 2 letters, 6 numbers, 1 letter (captial letters)
            pattern="[A-Za-z]+\d{6}[A-Za-z]+"
            minLength={9}
            maxLength={9}
            // autoCapitalize="characters"
            onChange={(e) =>
              setInputProfile({ ...inputProfile, ni_number: e.target.value })
            }
          />

        </div>

        {/* PROFILE - phone */}
        <div className="addsu-inputcontainer">
          <label htmlFor="phone" id="phone_label" className="addsu-labeltext">
            Phone:{" "}
          </label>
          <input
            placeholder="Phone"
            value={phone}
            type="text"
            className="addsu-inputfield"
            id="phone"
            minLength={11}
            maxLength={11}
            pattern="[0-9]{11}"
            onChange={(e) =>
              setInputProfile({ ...inputProfile, phone: e.target.value })
            }
          />

        </div>

                {/* PROFILE - accomodation needs  */}
                <div className="addsu-inputcontainer">
          <label
            htmlFor="accomodation_needs"
            id="accomodation-needs-label"
            className="addsu-labeltext"
          >
            Accomodation needs:{" "}
          </label>
          <input
            type="text"
            placeholder="Accomodation needs"
            id="accomodation_needs"
            className="addsu-inputfield"
            value={accomodation_needs}
            onChange={(e) =>
              setInputProfile({
                ...inputProfile,
                accomodation_needs: e.target.value,
              })
            }
          />
        </div>

                {/* PROFILE - languages  */}
                <div className="addsu-inputcontainer">
          <label
            htmlFor="languages"
            id="languages_input"
            className="addsu-labeltext"
          >
            Languages:{" "}
          </label>
          <input
            type="text"
            placeholder="Languages"
            id="languages"
            className="addsu-inputfield"
            name="languages"
            value={languages}
            onChange={(e) =>
              setInputProfile({
                ...inputProfile,
                languages: e.target.value,
              })
            }
          />
        </div>

        {/* PROFILE - email */}
        <div className="addsu-inputcontainer">
          <label htmlFor="email" id="email_label" className="addsu-labeltext">
            Email:{" "}
          </label>
          <input
            // the type being email means that the input will be validated to ensure it is a valid email address (use of @ symbol)
            type="email"
            placeholder="Email"
            id="email"
            className="addsu-inputfield"
            value={email}
            onChange={(e) =>
              setInputProfile({ ...inputProfile, email: e.target.value })
            }
          />
        </div>

        {/* PROFILE - emergency_contact_name */}
        <div className="addsu-inputcontainer">
          <label
            htmlFor="emergency_contact_name"
            id="emergency_contact_name_label"
            className="addsu-labeltext"
          >
            Emergency Contact Name:{" "}
          </label>
          <input
            type="text"
            placeholder="Emergency Contact Name"
            id="emergency_contact_name"
            className="addsu-inputfield"
            value={emergency_contact_name}
            onChange={(e) =>
              setInputProfile({
                ...inputProfile,
                emergency_contact_name: e.target.value,
              })
            }
          />
        </div>
        {/* PROFILE - emergency_contact_relationship  */}
        <div className="addsu-inputcontainer">
          <label
            htmlFor="emergency_contact_relationship"
            id="emergency_contact_relationship_label"
            className="addsu-labeltext"
          >
            Emergency Contact Relationship:{" "}
          </label>
          <input
            type="text"
            placeholder="Emergency Contact Relationship"
            id="emergency_contact_relationship"
            className="addsu-inputfield"
            value={emergency_contact_relationship}
            onChange={(e) =>
              setInputProfile({
                ...inputProfile,
                emergency_contact_relationship: e.target.value,
              })
            }
          />
        </div>

        {/* PROFILE - emergency_contact_phone  */}
        <div className="addsu-inputcontainer">
          <label
            htmlFor="emergency_contact_phone"
            id="emergency_contact_phone_label"
            className="addsu-labeltext"
          >
            Emergency Contact Phone:{" "}
          </label>
          <input
            type="tel"
            placeholder="Emergency Contact Phone"
            id="emergency_contact_phone"
            className="addsu-inputfield"
            maxLength={11}
            pattern="[0-9]{11}"
            value={emergency_contact_phone}
            onChange={(e) =>
              setInputProfile({
                ...inputProfile,
                emergency_contact_phone: e.target.value,
              })
            }
          />
        </div>

        {/* PROFILE - submit button  */}

        <button
          className="addsu-submit_button"
          onClick={async function (e) {
            // the e.preventDefault() prevents the page from refreshing when the button is clicked
            e.preventDefault();

           //prepare data for zod validation
            const inputData = {
              first_name,
              last_name,
              age: age ? parseInt(age, 10) : null, //converts string value to number decimal(base 10) or null
              gender,
              dob: dob ? new Date(dob) : null, //input value is a string, this converts it to a date or null
              ni_number: ni_number.length === 0 ? null : ni_number,
              phone: phone.length === 0 ? null : phone,
              accomodation_needs,
              languages,
              email: email.length === 0 ? null : email,
              emergency_contact_name,
              emergency_contact_relationship,
              emergency_contact_phone: emergency_contact_phone.length === 0 ? null : emergency_contact_phone,
            };
            console.log("Input Data:", inputData);
            //this filters out the null values or it will not pass zod validation
            const filteredInputData = Object.fromEntries(
              Object.entries(inputData).filter(([_, value]) => value !== null)
            );
            
        
            try {
              // Validate the input data using zod
              const result = profileColumnsSchema.safeParse(filteredInputData);
              //if the data is not valid the errors will be logged in the console
              if(!result.success) {
                console.log("Validation errors:", result.error);
              }
              else {
                //disables the submit button to prevent accidentally submitting data twice
              e.target.disabled = true;
              await submitPost(
                "service_users",
                [profileColumns],
                [profileColumnsBlank],
                true
              );
              e.target.disabled = false;
              }
            } catch (error) {
              e.target.disabled = false;
              console.error("Error submitting form:", error);
          
            }
          }}
        >
          Add Service User +
        </button>
      </form>
      </section>
    </>
  );
}
