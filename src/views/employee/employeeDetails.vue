<template>
    <div class="container">

        <h1 style="text-align: center; color: royalblue;">Employee List</h1>
        <router-link to="home">Add</router-link>
        <h6 style="text-align: right;">
            <router-link to="/">Back</router-link>
        </h6>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Fathe's Name</th>
                    <th>Mother's Name</th>
                    <th>Designation</th>
                    <th>Gender</th>
                    <th>Salary</th>
                    <th>Remarks</th>
                    <th>Picture</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" :key="employee.empId">
                    <td>{{ employee.empId }}</td>
                    <td>{{ employee.empName }}</td>
                    <td>{{ employee.fname }}</td>
                    <td>{{ employee.mname }}</td>
                    <td>{{ employee.designation }}</td>
                    <td>{{ employee.gender }}</td>
                    <td>{{ employee.salary }}</td>
                    <td>{{ employee.remarks }}</td>
                    <td v-if="employee.pic">
                        <img :src="'data:image/png;base64,' + employee.pic" alt="Employee Picture" width="50"
                            height="50" />
                    </td>
                    <!-- <td v-else>No Picture</td> -->
                    <td>

                        <button @click="openEditModal(employee)" type="button" class="btn btn-primary"
                            style="margin-right: 5px;">Edit</button>
                        <button type="button" class="btn btn-info" style="margin-right: 5px;">Details</button>
                        <button @click="deleteEmployee(employee.empId)" type="button" class="btn btn-danger"
                            style="margin-right: 5px;">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Edit Employee Modal -->
        <EditEmployeeModal v-if="isEditModalVisible" :employee="currentEmployee" :isVisible="isEditModalVisible"
            @update-employee="updateEmployee" @close="closeEditModal" />

    </div>
</template>

<script>
import axios from 'axios';
import EditEmployeeModal from '../modal/EditEmployeeModal.vue';

export default {
    components: {
        EditEmployeeModal, // Register the modal component
    },

    data() {
        return {
            employees: [], // Array to hold employee data
            isEditModalVisible: false, // Modal visibility state
            currentEmployee: {}, // Employee currently being edited
        };
    },
    created() {
        this.getAllEmployees(); // Fetch data when component is created
    },
    methods: {
        getAllEmployees() {
            axios.get('http://localhost:8081/api/employees')
                .then(response => {
                    this.employees = response.data; // Assign response data to employees array
                })
                .catch(error => {
                    console.error("There was an error fetching the employee data:", error);
                });
        },
        // Open openEditModal
        openEditModal(employee) {

            this.currentEmployee = { ...employee }; // Create a copy of the employee data for editing
            this.isEditModalVisible = true; // Show the modal
        },
        // Close openEditModal
        closeEditModal() {
            this.isEditModalVisible = false; // Hide the modal
        },
        // update employee
        updateEmployee(updatedEmployee) {
            axios.put(`http://localhost:8081/api/employees/${updatedEmployee.empId}`, updatedEmployee)
                .then(response => {
                    console.log("Employee updated successfully:", response.data);
                    this.getAllEmployees(); // Refresh the list after updating
                })
                .catch(error => {
                    console.error("There was an error updating the employee:", error);
                });
        },


        // end deleteEmployee
        deleteEmployee(empId) {
            if (confirm('Are you sure you want to delete this employee?')) {
                axios.delete(`http://localhost:8081/api/employees/${empId}`)
                    .then(response => {
                        console.log("Employee deleted successfully:", response.data);
                        this.getAllEmployees(); // Refresh the list after deletion
                    })
                    .catch(error => {
                        console.error("There was an error deleting the employee:", error);
                    });
            }
        }

        //end delete

    },
};
</script>

<style scoped>
table {
    width: 100%;

}

th,
td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
}

img {
    border-radius: 5px;
}
</style>