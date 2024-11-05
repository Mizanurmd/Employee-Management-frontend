<template>
    <div class="container">
        <div class="table-responsive">
            <h1 style="text-align: center; color: royalblue;">Employee List</h1>
            <router-link to="home">Add Employee</router-link>
            <h6 style="text-align: right;">
                <router-link to="/">Back</router-link>
            </h6>
            <div class="scrollable-table">
                <table class="table table-hover table-striped">
                    <thead>
                        <tr class="table-dark">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Father's Name</th>
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
                            <td>
                                <button @click="openEditModal(employee)" type="button" class="btn btn-primary"
                                    style="margin-right: 5px;">
                                    <font-awesome-icon :icon="['fas', 'edit']" />
                                </button>
                                <button @click="openDetailsModal(employee)" type="button" class="btn btn-info"
                                    style="margin-right: 5px;">
                                    <font-awesome-icon :icon="['fas', 'eye']" />

                                </button>

                                <button type="button" class="btn btn-danger" style="margin-right: 5px;">
                                    <font-awesome-icon :icon="['fas', 'download']" />
                                </button>

                                <button @click="deleteEmployee(employee.empId)" type="button" class="btn btn-danger"
                                    style="margin-right: 5px;">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Edit modal -->
            <EditEmployeeModal v-if="isEditModalVisible" :employee="currentEmployee" :isVisible="isEditModalVisible"
                @update-employee="updateEmployee" @close="closeEditModal" />
            <!-- details modal -->
            <DetailsEmployeeModal v-if="isDetailsModalVisible" :employee="currentEmployee"
                :isVisible="isDetailsModalVisible" @close="closeDetailsModal" />
        </div>


    </div>
</template>

<script>
import axios from 'axios';
import EditEmployeeModal from '../modal/EditEmployeeModal.vue';
import DetailsEmployeeModal from '../modal/DetailsEmployeeModal.vue';

export default {
    components: {
        EditEmployeeModal,
        DetailsEmployeeModal,
    },
    data() {
        return {
            employees: [],
            isEditModalVisible: false,
            isDetailsModalVisible: false,
            currentEmployee: {},
        };
    },
    created() {
        this.getAllEmployees();
    },
    methods: {
        getAllEmployees() {
            axios.get('http://localhost:8081/api/employees')
                .then(response => {
                    this.employees = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the employee data:", error);
                });
        },
        openEditModal(employee) {
            this.currentEmployee = { ...employee };
            this.isEditModalVisible = true;
        },
        closeEditModal() {
            this.isEditModalVisible = false;
        },
        updateEmployee(updatedEmployee) {
            axios.put(`http://localhost:8081/api/employees/${updatedEmployee.empId}`, updatedEmployee)
                .then(response => {
                    console.log("Employee updated successfully:", response.data);
                    this.getAllEmployees();
                })
                .catch(error => {
                    console.error("There was an error updating the employee:", error);
                });
        },
        // details 
        openDetailsModal(employee) {
            this.currentEmployee = { ...employee };
            this.isDetailsModalVisible = true;
        },
        closeDetailsModal() {
            this.isDetailsModalVisible = false;
        },

        // delete method
        deleteEmployee(empId) {
            if (confirm('Are you sure you want to delete this employee?')) {
                axios.delete(`http://localhost:8081/api/employees/${empId}`)
                    .then(response => {
                        console.log("Employee deleted successfully:", response.data);
                        this.getAllEmployees();
                    })
                    .catch(error => {
                        console.error("There was an error deleting the employee:", error);
                    });
            }
        }
    },
};
</script>

<style scoped>
img {
    border-radius: 5px;
}

.scrollable-table {
    max-height: 400px;
    /* Set desired height for scroll */
    overflow-y: auto;
}

.table thead th {
    position: sticky;
    top: 0;
    background-color: #343a40;
    /* Background color for sticky header */
    color: white;
    z-index: 1;
}
</style>
