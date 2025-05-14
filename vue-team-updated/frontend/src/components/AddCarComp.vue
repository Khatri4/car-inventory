<template>
  <div v-if="routeStore.currentRoute === '/add-car'" class="container mt-5">
    <div class="card shadow-lg p-4">
      <h3 class="mb-4 d-flex align-items-center">
        <i class="bi bi-plus-circle me-2 text-primary"></i> Add New Car
      </h3>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="row g-4">
          <div class="col-12">
            <h5 class="border-bottom pb-2">Basic Information</h5>
          </div>

          <div class="col-md-6" v-for="field in fields" :key="field.key">
            <label class="form-label">{{ field.label }}</label>
            <input
              :type="field.type || 'text'"
              class="form-control"
              v-model="car[field.key]"
              :required="field.required"
              :placeholder="'Enter ' + field.label"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Fuel Type</label>
            <select class="form-select" v-model="car.FuelType" required>
              <option disabled value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Car Type</label>
            <select class="form-select" v-model="car.CarType" required>
              <option disabled value="">Select Car Type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>

          <div class="col-12">
            <h5 class="border-bottom pb-2 mt-4">Upload Images</h5>
          </div>

          <div class="col-12">
            <label class="form-label">Choose up to 5 images</label>
            <input
              type="file"
              class="form-control"
              multiple
              @change="handleFileUpload"
              accept="image/*"
            />
          </div>

          <div class="col-12 mt-3 d-flex flex-wrap gap-3">
            <div v-if="images.length">
              <div
                v-for="(img, i) in images"
                :key="i"
                class="border rounded p-1 shadow-sm"
                style="width: 100px; height: 100px; overflow: hidden"
              >
                <img
                  :src="URL.createObjectURL(img)"
                  class="img-fluid h-100 w-100"
                  style="object-fit: cover"
                />
              </div>
            </div>
            <p v-else>No images uploaded yet.</p>
          </div>

          <div class="col-12 mt-4">
            <button class="btn btn-primary w-100" type="submit">
              <i class="bi bi-check-circle me-2"></i> Submit Car Details
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { useCarStore } from "../store/carStore";
import { useRouteStore } from "../store/routeStore";
import { useRoute, useRouter } from "vue-router";

const URL = window.URL || window.webkitURL;
const carStore = useCarStore();
const routeStore = useRouteStore();
const route = useRoute();
const router = useRouter();

const setRouteStore = (route) => {
  routeStore.currentRoute = route.currentRoute;
  routeStore.params = route.params;
};

setRouteStore({
  currentRoute: "/add-car",
  params: {},
});

const car = ref({
  Brand: "",
  Model: "",
  Year: null,
  CarType: "",
  FuelType: "",
  Transmission: "",
  EngineCapacity: null,
  Displacement: null,
  Cylinders: null,
  MaxPower: "",
  SeatingCapacity: null,
  Airbags: null,
  Price: null,
});

const fields = [
  { key: "Brand", label: "Brand", required: true },
  { key: "Model", label: "Model", required: true },
  { key: "Year", label: "Year", type: "number", required: true },
  { key: "Transmission", label: "Transmission", required: true },
  { key: "EngineCapacity", label: "Engine Capacity", type: "number" },
  { key: "Displacement", label: "Displacement", type: "number" },
  { key: "Cylinders", label: "Cylinders", type: "number" },
  { key: "MaxPower", label: "Max Power" },
  { key: "SeatingCapacity", label: "Seating Capacity", type: "number" },
  { key: "Airbags", label: "Airbags", type: "number" },
  { key: "Price", label: "Price", type: "number", required: true },
];

const images = ref([]);

function handleFileUpload(event) {
  images.value = Array.from(event.target.files);
}

async function handleSubmit() {
  for (const field of fields) {
    if (field.required && !car.value[field.key]) {
      alert(`Please fill in the required field: ${field.label}`);
      return;
    }
  }

  try {
    await carStore.addCar(car.value, images.value);
    alert("Car added successfully!");
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Failed to add car");
  }
}

function resetForm() {
  car.value = {
    Brand: "",
    Model: "",
    Year: null,
    CarType: "",
    FuelType: "",
    Transmission: "",
    EngineCapacity: null,
    Displacement: null,
    Cylinders: null,
    MaxPower: "",
    SeatingCapacity: null,
    Airbags: null,
    Price: null,
  };
  images.value = [];
}

onUnmounted(() => {
  images.value.forEach((img) => URL.revokeObjectURL(img));
});
</script>
