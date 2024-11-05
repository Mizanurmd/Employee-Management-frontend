<template>
    <div v-if="isVisible" class="modal">
        <div class="modal-content">
            <h1><span class="close" @click="closeModal">&times;</span></h1>
            <h2 class="text-center mb-4" style="color: blue; font-weight: bold;">Edit Employee</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="empId">Employee Id</label>
                    <input type="text" id="empId" v-model="employee.empId" required />
                </div>
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
                <!-- <div class="form-group">
                    <label for="pic">Upload Picture</label>
                    <input type="file" id="pic" @change="onFileChange" />
                </div> -->
                <div class="form-group">
                    <label for="pic">Upload Picture</label>

                    <!-- Display the current picture if it exists -->
                    <div v-if="employee.pic" class="current-pic">
                        <p>Current Picture:</p>
                        <img :src="'data:image/png;base64,' + employee.pic" alt="Current Employee Picture" width="50"
                            height="50" />
                    </div>

                    <!-- File input to upload a new picture -->
                    <input type="file" id="pic" @change="onFileChange" />
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        employee: {
            type: Object,
            required: true,
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        submitForm() {
            this.$emit('update-employee', this.employee); // Emit event with updated employee data
            this.closeModal();
        },
        closeModal() {
            this.$emit('close'); // Emit close event
        },
        //close end
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.employee.pic = e.target.result.split(',')[1]; // Update with new base64-encoded image data
                };
                reader.readAsDataURL(file); // Read file as Data URL
            }
        },
        //onFileChange
    },
};
</script>

<style scoped>
.modal {
    display: block;
    /* Show modal */
    position: fixed;
    /* Stay in place */
    z-index: 1000;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    /* 15% from the top and centered */
    padding: 20px;
    border: 2px solid #888;
    width: 50%;
    /* Could be more or less, depending on screen size */
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

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