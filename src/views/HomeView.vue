<script>
import axios from 'axios';

export default {
  data() {
    return {
      employee: {
        empId: null,
        empName: '',
        fname: '',
        mname: '',
        designation: '',
        gender: '',
        salary: 0,
        remarks: '',
        pic: null,
      },
    };
  },
  methods: {

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.employee.pic = file; // Store the file object directly
      }
    },


    submitForm() {
      const formData = new FormData();
      formData.append('empName', this.employee.empName || '');
      formData.append('fname', this.employee.fname || '');
      formData.append('mname', this.employee.mname || '');
      formData.append('designation', this.employee.designation || '');
      formData.append('gender', this.employee.gender || '');
      formData.append('salary', this.employee.salary || 0);
      formData.append('remarks', this.employee.remarks || '');


      // Only append the file if it is selected
      if (this.employee.pic) {
        formData.append('pic', this.employee.pic); // Add the file directly
      } else {
        console.warn("No file selected for 'pic'");
      }

      axios.post('http://localhost:8081/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log("Employee added successfully:", response.data);
          // Redirect to the desired page after saving successfully
          this.$router.push({ name: 'employeeDetails' });
        })
        .catch(error => {
          console.error("There was an error adding the employee:", error);
        });
    },


  },
};
</script>




<template>
  <main>
    <div class="employee-form">
      <h2>Add Employee</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="empName">Employee Name</label>
          <input type="text" id="empName" v-model="employee.empName" required />
        </div>

        <div class="form-group">
          <label for="fname">Father's Name</label>
          <input type="text" id="fname" v-model="employee.fname" required />
        </div>

        <div class="form-group">
          <label for="mname">Mother's Name</label>
          <input type="text" id="mname" v-model="employee.mname" required />
        </div>

        <div class="form-group">
          <label for="designation">Designation</label>
          <input type="text" id="designation" v-model="employee.designation" required />
        </div>

        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="employee.gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="salary">Salary</label>
          <input type="number" id="salary" v-model.number="employee.salary" required />
        </div>

        <div class="form-group">
          <label for="remarks">Remarks</label>
          <textarea id="remarks" v-model="employee.remarks"></textarea>
        </div>

        <div class="form-group">
          <label for="pic">Upload Picture</label>
          <input type="file" id="pic" @change="onFileChange" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.employee-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
