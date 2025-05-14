<template>
  <div class="container my-5 view-car-container">
    <div class="card shadow-lg p-4">
      <h3 class="mb-4 d-flex align-items-center text-primary fw-bold">
        <i class="bi bi-eye me-2"></i> Car Details
      </h3>

      <div class="row">
        <div class="col-md-6 d-flex flex-column align-items-center">
          <h5 class="section-heading">Car Images</h5>
          <div class="image-slider mb-2">
            <img
              :src="car.images[currentImageIndex]"
              alt="Car Image"
              class="slider-image"
            />
          </div>
          <p class="text-center text-muted">
            Image {{ currentImageIndex + 1 }} of {{ car.images.length }}
          </p>
        </div>

        <div class="col-md-6">
          <h5 class="section-heading">Basic Information</h5>
          <div class="row g-3">
            <div class="col-12" v-for="field in fields" :key="field.key">
              <label class="form-label fw-semibold">{{ field.label }}</label>
              <input
                :type="field.type || 'text'"
                class="form-control"
                :value="car[field.key]"
                disabled
              />
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold">Fuel Type</label>
              <input
                type="text"
                class="form-control"
                :value="car.fuelType"
                disabled
              />
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold">Car Type</label>
              <input
                type="text"
                class="form-control"
                :value="car.carType"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div class="text-end mt-4">
        <button class="btn btn-outline-primary px-4 py-2" @click="editCar">
          <i class="bi bi-pencil me-2"></i> Edit Car Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCarStore } from "../store/carStore";

const route = useRoute();
const router = useRouter();
const carStore = useCarStore();
const carId = route.params.id;

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
  images: [],
});

const currentImageIndex = ref(0);
let sliderInterval = null;

const fields = [
  { key: "brand", label: "Brand" },
  { key: "model", label: "Model" },
  { key: "year", label: "Year", type: "number" },
  { key: "transmission", label: "Transmission" },
  { key: "engineCapacity", label: "Engine Capacity", type: "number" },
  { key: "displacement", label: "Displacement", type: "number" },
  { key: "cylinders", label: "Cylinders", type: "number" },
  { key: "maxPower", label: "Max Power" },
  { key: "seatingCapacity", label: "Seating Capacity", type: "number" },
  { key: "airbags", label: "Airbags", type: "number" },
  { key: "price", label: "Price", type: "number" },
];

async function fetchCarDetails(id) {
  try {
    const carData = await carStore.fetchCarById(id);
    car.value = {
      brand: carData.Brand,
      model: carData.Model,
      year: carData.Year,
      transmission: carData.Transmission,
      engineCapacity: carData.EngineCapacity,
      displacement: carData.Displacement,
      cylinders: carData.Cylinders,
      maxPower: carData.MaxPower,
      seatingCapacity: carData.SeatingCapacity,
      airbags: carData.Airbags,
      price: carData.Price,
      fuelType: carData.FuelType,
      carType: carData.CarType,
      images: carData.Images || [],
    };
    startSlider();
  } catch (error) {
    console.error("Error fetching car details:", error);
  }
}

function editCar() {
  router.push({ name: "edit-car", params: { id: carId } });
}

function startSlider() {
  if (car.value.images.length > 1) {
    sliderInterval = setInterval(() => {
      currentImageIndex.value =
        (currentImageIndex.value + 1) % car.value.images.length;
    }, 3000);
  }
}

function stopSlider() {
  if (sliderInterval) clearInterval(sliderInterval);
}

onMounted(() => {
  if (carId) fetchCarDetails(carId);
});

onUnmounted(() => {
  stopSlider();
});
</script>

<style scoped>
.view-car-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.section-heading {
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
  margin-bottom: 16px;
  color: #343a40;
}

.image-slider {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  border-radius: 12px;
}

input.form-control:disabled {
  background-color: #f9f9f9;
  color: #333;
  font-weight: 500;
}
</style>
