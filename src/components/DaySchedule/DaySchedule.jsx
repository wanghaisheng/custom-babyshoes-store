import React, {useState, useEffect} from "react";
import {Formik} from 'formik';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { getAppointmentsByDate } from "api";
import {validationSchemaTime, FormError} from 'utils/formik';

import { FormWrapper,  CustomDatePicker,  FieldSet } from "./DaySchedule.styled";
import {  Input, Legend } from "../WaiverForm/WaiverForm.styled";
import styleDatepickerBooking from './datepicker-book.css';
import Appointments from "components/Appointments/Appointments";

const DaySchedule = ()=> {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(()=> {
    const func = async()=>{
      const formattedDate = format(new Date(), 'MM.dd.yyyy'); 
      const appointments = await getAppointmentsByDate(formattedDate);
      setData(appointments);
    }
    func();
}, []);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const initialValues =  {
    date: new Date(),
  };

    const handleDataChange = async (date, field, form) => {
      const formattedDate = format(date, 'MM.dd.yyyy'); 
      // form.setFieldValue(field.name, date); 
     
      const appointments = await getAppointmentsByDate(formattedDate);
      if(appointments) {
        setData(appointments);
      }
      
    };

  //   useEffect(()=>{
  //     (async()=>{
  //      const slots = await getAvailableSlots(format(selectedDate, 'MM.dd.yyyy'), duration);
  //      setSlots(slots);
  //     })();
 
  //  },[duration, selectedDate]);

  // const handleSubmit = async(values, actions) => {
  //     const info = {
  //       ...appointmentInfo,
  //       date: format(values.date, 'MM.dd.yyyy'),
  //       slot: values.slot,
  //       duration: duration,
  //     };

  //     setAppointmentInfo(info);

  //     navigate('/booking/payment')
  //     console.log(info);
  // };

  return (
      <>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaTime}
      > 
      {({ handleChange, values }) => (
        <FormWrapper autoComplete="off">
        <FieldSet> 
        <Legend>Choose a time:</Legend>
          <Input name="date">
            {({ field, form }) => (
              <CustomDatePicker
                {...field}
                selected={field.value}
                onChange={(date) => handleDataChange(date, field, form)}
                showPopperArrow={false}
                minDate={new Date()}
                maxDate={maxDate}
                dateFormat="dd/MM/yyyy"
                className={styleDatepickerBooking}
                inline
              />
            )}
          </Input>
          <FormError name="date" component="span" />
          </FieldSet>
        </FormWrapper>)}
      </Formik>
      <Appointments data={data}/>
      </>
    );
};

export default DaySchedule;