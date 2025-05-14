<template>
  <div class="container mt-5">
    <div class="card shadow-lg p-4" v-if="car">
      <h3 class="mb-4 d-flex align-items-center">
        <i class="bi bi-pencil-square me-2 text-primary"></i> Edit Car Details
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
            <select class="form-select" v-model="car.fuelType" required>
              <option disabled value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Car Type</label>
            <select class="form-select" v-model="car.carType" required>
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
                  :src="
                    img.isExisting ? img.url : URL.createObjectURL(img.file)
                  "
                  class="img-fluid h-100 w-100"
                  style="object-fit: cover"
                />
              </div>
            </div>
            <p v-else class="text-muted">No images uploaded yet.</p>
          </div>

          <div class="col-12 mt-4">
            <button class="btn btn-primary w-100" type="submit">
              <i class="bi bi-check-circle me-2"></i> Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Loading car details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCarStore } from "../store/carStore";
import { useRouteStore } from "../store/routeStore";

const URL = window.URL || window.webkitURL;
const route = useRoute();
const router = useRouter();
const carStore = useCarStore();
const routeStore = useRouteStore();

const carId = route.params.id || null;

const car = ref({
  brand: "",
  model: "",
  year: null,
  transmission: "",
  engineCapacity: null,
  displacement: null,
  cylinders: null,
  maxPower: "",
  seatingCapacity: null,
  airbags: null,
  price: null,
  fuelType: "",
  carType: "",
});

const images = ref([]);

const setRouteStore = (route) => {
  routeStore.currentRoute = route.currentRoute;
  routeStore.params = route.params;
};

setRouteStore({
  currentRoute: "/show-car",
  params: { carId },
});

const fields = [
  { key: "brand", label: "Brand", required: true },
  { key: "model", label: "Model", required: true },
  { key: "year", label: "Year", type: "number", required: true },
  { key: "transmission", label: "Transmission", required: true },
  { key: "engineCapacity", label: "Engine Capacity", type: "number" },
  { key: "displacement", label: "Displacement", type: "number" },
  { key: "cylinders", label: "Cylinders", type: "number" },
  { key: "maxPower", label: "Max Power" },
  { key: "seatingCapacity", label: "Seating Capacity", type: "number" },
  { key: "airbags", label: "Airbags", type: "number" },
  { key: "price", label: "Price", type: "number", required: true },
];

async function fetchCarDetails(carId) {
  if (!carId) {
    console.error("Car ID is missing.");
    return;
  }

  try {
    const carData = await carStore.fetchCarById(carId);

    car.value = {
      brand: carData.Brand || "",
      model: carData.Model || "",
      year: carData.Year || null,
      transmission: carData.Transmission || "",
      engineCapacity: carData.EngineCapacity || null,
      displacement: carData.Displacement || null,
      cylinders: carData.Cylinders || null,
      maxPower: carData.MaxPower || "",
      seatingCapacity: carData.SeatingCapacity || null,
      airbags: carData.Airbags || null,
      price: carData.Price || null,
      fuelType: carData.FuelType || "",
      carType: carData.CarType || "",
    };

    if (Array.isArray(carData.Images)) {
      images.value = carData.Images.map((url) => ({ isExisting: true, url }));
    }
  } catch (error) {
    console.error("Failed to fetch car details:", error);
  }
}

function handleFileUpload(event) {
  const newFiles = Array.from(event.target.files).map((file) => ({
    isExisting: false,
    file,
  }));
  images.value = [...images.value, ...newFiles].slice(0, 5);
}

async function handleSubmit() {
  for (const field of fields) {
    if (field.required && !car.value[field.key]) {
      alert(`Please fill in the required field: ${field.label}`);
      return;
    }
  }

  const mappedCar = {
    Brand: car.value.brand,
    Model: car.value.model,
    Year: car.value.year,
    Transmission: car.value.transmission,
    EngineCapacity: car.value.engineCapacity,
    Displacement: car.value.displacement,
    Cylinders: car.value.cylinders,
    MaxPower: car.value.maxPower,
    SeatingCapacity: car.value.seatingCapacity,
    Airbags: car.value.airbags,
    Price: car.value.price,
    FuelType: car.value.fuelType,
    CarType: car.value.carType,
  };

  const newFiles = images.value
    .filter((img) => !img.isExisting)
    .map((img) => img.file);

  try {
    await carStore.updateCar(carId, mappedCar, newFiles);
    alert("Car details updated successfully!");

    // After saving, navigate back to the show car details page
    router.push({ path: `/show-car/${carId}` });
  } catch (err) {
    console.error("Update error:", err);
    alert(`Failed to update car details: ${err.message}`);
  }
}

onMounted(() => {
  if (carId) {
    fetchCarDetails(carId);
  }
});

onUnmounted(() => {
  images.value
    .filter((img) => !img.isExisting)
    .forEach((img) => URL.revokeObjectURL(img.file));
});
</script>

<style scoped>
.text-muted {
  color: #6c757d;
}
</style>
