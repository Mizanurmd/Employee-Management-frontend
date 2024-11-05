<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <h3 style="color: royalblue; font-weight: bold;">Employee Details</h3>
            <hr>
            <ul>
                <li><strong>Picture:</strong></li>
                <div v-if="employee.pic">
                    <img :src="'data:image/png;base64,' + employee.pic" alt="Employee Picture" width="100"
                        height="100" />
                </div>
                <li><strong>ID : </strong> {{ employee.empId }}</li>
                <li><strong>Name : </strong> {{ employee.empName }}</li>
                <li><strong>Father's Name : </strong> {{ employee.fname }}</li>
                <li><strong>Mother's Name : </strong> {{ employee.mname }}</li>
                <li><strong>Designation : </strong> {{ employee.designation }}</li>
                <li><strong>Gender: </strong> {{ employee.gender }}</li>
                <li><strong>Salary : </strong> {{ employee.salary }}</li>
                <li><strong>Remarks : </strong> {{ employee.remarks }}</li>

            </ul>
            <button @click="close" class="btn btn-secondary">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        employee: {
            type: Object,
            required: true
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    text-align: left;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}

img {
    border-radius: 5px;

}
</style>
