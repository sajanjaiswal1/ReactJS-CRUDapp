import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("Province 1");
  const [country, setCountry] = useState("Nepal");
  const [profilePic, setProfilePic] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [profilePicError, setProfilePicError] = useState("");
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data.map((country) => country.name.common)));
  }, []);

  useEffect(() => {
    setProvinces([
      "Province 1",
      "Province 2",
      "Province 3",
      "Province 4",
      "Province 5",
      "Province 6",
      "Province 7",
    ]);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    const profile = storedData.find((profile) => profile.id === parseInt(id));

    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
      setDob(profile.dob);
      setCity(profile.city);
      setDistrict(profile.district);
      setProvince(profile.province);
      setCountry(profile.country);
      setProfilePic(profile.profilePic);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!name || !validateName(name)) {
      setNameError("Name is required and must start with an alphabet.");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!phone || phone.length < 7 || isNaN(phone)) {
      setPhoneError("Please enter a valid phone number.");
      isValid = false;
    } else {
      setPhoneError("");
    }
    if (!profilePic || !validateProfilePic(profilePic)) {
      setProfilePicError("Please upload a PNG format image.");
      isValid = false;
    } else {
      setProfilePicError("");
    }
    if (isValid) {
      let storedData = JSON.parse(localStorage.getItem("formData")) || [];
      const updatedData = {
        id: parseInt(id),
        name,
        email,
        phone,
        dob,
        city,
        district,
        province,
        country,
        profilePic: profilePic ? URL.createObjectURL(profilePic) : profilePic, // Handle file update
      };

      storedData = storedData.map((data) =>
        data.id === parseInt(id) ? updatedData : data
      );

      localStorage.setItem("formData", JSON.stringify(storedData));

      setSubmissionMessage("Form has been updated successfully!");


      setName("");
      setEmail("");
      setPhone("");
      setDob("");
      setCity("");
      setDistrict("");
      setProvince("Province 1");
      setCountry("Nepal");
      setProfilePic(null);

      navigate("/Read");
    }
  };

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validateProfilePic = (file) => {
    return file && file.type === "image/png";
  };

  const validateName = (name) => {
    return /^[a-zA-Z].*$/.test(name);
  };

  return (
    <>
      <div className="container mx-auto bg-rose-50 p-10">
        <div className="font-bold mb-2 text-center text-2xl">
          <div>Update Profile</div>
          <div>Update the profile information below.</div>
        </div>

        {submissionMessage && (
          <div className="text-green-500 text-center mb-4">
            {submissionMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Form fields */}
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="border rounded-sm p-1"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!validateName(e.target.value)) {
                  setNameError("Name must start with an alphabet.");
                } else {
                  setNameError("");
                }
              }}
              placeholder="Enter your name"
            />
            {nameError && <div className="text-red-500 text-sm">{nameError}</div>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="border rounded-sm p-1"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!validateEmail(e.target.value)) {
                  setEmailError("Please enter a valid email address.");
                } else {
                  setEmailError("");
                }
              }}
              placeholder="Enter your email"
            />
            {emailError && (
              <div className="text-red-500 text-sm">{emailError}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="dob">Date of Birth</label>
              <input
                className="border rounded-sm p-1"
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="border rounded-sm p-1"
                id="phone"
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (e.target.value.length < 7 || isNaN(e.target.value)) {
                    setPhoneError("Please enter a valid phone number.");
                  } else {
                    setPhoneError("");
                  }
                }}
                placeholder="Enter your phone number"
              />
              {phoneError && (
                <div className="text-red-500 text-sm">{phoneError}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="country">Country</label>
              <select
                className="border rounded-sm p-1"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="province">Province</label>
              <select
                className="border rounded-sm p-1"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                {provinces.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="city">City</label>
              <input
                className="border rounded-sm p-1"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="district">District</label>
              <input
                className="border rounded-sm p-1"
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter your district"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="profilePic">Profile Picture (PNG only)</label>
            <input
              className="border rounded-sm p-1"
              id="profilePic"
              type="file"
              accept=".png"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePic(e.target.files[0]);
                  setProfilePicError("");
                } else {
                  setProfilePicError("Please upload a PNG format image.");
                }
              }}
            />
            {profilePicError && (
              <div className="text-red-500 text-sm">{profilePicError}</div>
            )}
          </div>

          <div className="text-center flex justify-around">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Update user
            </button>
            {/* <button
              type="button"
              onClick={() => navigate("/Read")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              View Profiles
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
