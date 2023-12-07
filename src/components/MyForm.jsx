import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// react-hook-form
import { Controller, useForm } from "react-hook-form";
// styles
import "../App.css";
// form
import { axiosRequest } from "../redux/requestMethod";
// redux
import { saveData, updateData } from "../redux/userReducer";

const MyForm = ({ isEdit = false, currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || "",
      sector: currentUser?.sector || "",
      agree: currentUser?.agree || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const [sectors, setSectors] = useState([]);

  // Fetch sectors from MongoDB
  useEffect(() => {
    const FetchSectors = async () => {
      try {
        return await axiosRequest.get(`/api/sectors`).then((response) => {
          setSectors(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    FetchSectors();
  }, []);

  const onSubmit = async (data) => {
    if (!isEdit) {
      const res = await saveData(dispatch, data);
      const id = res.data._id;
      if (res.status === 201) {
        alert("Data Saved successfully...");
        navigate(`/edit/${id}`);
        reset();
      } else {
        alert("You have a problem!! Check your network");
      }
    } else {
      const res = await updateData(dispatch, data, currentUser?._id);
      if (res?.status === 200) {
        alert("Data Updated successfully ...");
        reset();
      } else {
        alert("You have a problem!! Check your network");
      }
    }
  };
  const renderOptions = (options) => {
    return options.map((option) => {
      if (option.children && option.children.length > 0) {
        return (
          <optgroup
            key={option._id}
            label={option.label}
          >
            {renderOptions(option.children)}
          </optgroup>
        );
      } else {
        return (
          <option
            key={option._id}
            value={option.value}
          >
            {option.label}
          </option>
        );
      }
    });
  };
  const renderSelect = (sector) => {
    return <>{renderOptions(sector.children)}</>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='helper-text'>
        Please enter your name and pick the Sectors you are currently involved
        in
      </p>
      <div className='input-container'>
        <br />
        <label>Name:</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <span className='error'>{errors.name.message}</span>}
      </div>
      <div className='input-container'>
        <label>Sectors:</label>
        <Controller
          name='sector'
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <select
              {...field}
              multiple={false}
            >
              {sectors.map((sector) => renderSelect(sector))}
            </select>
          )}
        />
        {errors.sectors && (
          <span className='error'>{errors.sectors.message}</span>
        )}
      </div>
      <div className='checkbox'>
        <input
          id='agreeCheckbox'
          type='checkbox'
          {...register("agree")}
        />
        <label htmlFor='agreeCheckbox'>Agree to terms</label>
      </div>
      {errors.agree && <span className='error'>{errors.agree.message}</span>}
      <div>
        <button type='submit'>Save</button>
      </div>
    </form>
  );
};

export default MyForm;
