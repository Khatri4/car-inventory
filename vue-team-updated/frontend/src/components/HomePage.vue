<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold">{{ title }}</h2>
      <hr class="w-50 mx-auto" />
    </div>

    <div class="text-center mb-4">
      <label for="search" class="form-label fs-4">Search Car</label>
      <input
        type="text"
        id="search"
        v-model="searchText"
        class="form-control w-50 mx-auto"
        placeholder="Search by Brand or Model"
      />
    </div>

    <div class="text-center mb-4">
      <button class="btn btn-outline-primary" @click="toggleFilters">
        <i class="bi bi-funnel-fill"></i>
        {{ showFilters ? "Hide Filters" : "Show Filters" }}
      </button>
    </div>

    <div
      v-if="showFilters"
      class="filters p-4 border rounded shadow-sm mb-5 bg-light"
    >
      <div class="row">
        <div class="col-md-3 mb-3">
          <h5><i class="bi bi-car-front"></i> Brand</h5>
          <div
            v-for="brand in getUniqueValues(cars, 'Brand')"
            :key="brand"
            class="d-flex align-items-center"
          >
            <input
              type="checkbox"
              :value="brand"
              v-model="selectedBrands"
              class="form-check-input"
            />
            <label>{{ brand }}</label>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <h5><i class="bi bi-fuel-pump"></i> Fuel Type</h5>
          <div
            v-for="fuelType in getUniqueValues(cars, 'FuelType')"
            :key="fuelType"
            class="d-flex align-items-center"
          >
            <input
              type="checkbox"
              :value="fuelType"
              v-model="selectedFuelTypes"
              class="form-check-input"
            />
            <label>{{ fuelType }}</label>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <h5><i class="bi bi-car"></i> Car Type</h5>
          <div
            v-for="carType in getUniqueValues(cars, 'CarType')"
            :key="carType"
            class="d-flex align-items-center"
          >
            <input
              type="checkbox"
              :value="carType"
              v-model="selectedCarTypes"
              class="form-check-input"
            />
            <label>{{ carType }}</label>
          </div>
        </div>

        <div class="col-md-3 mb-3">
          <h5><i class="bi bi-gear"></i> Transmission</h5>
          <div
            v-for="transmission in getUniqueValues(cars, 'Transmission')"
            :key="transmission"
            class="d-flex align-items-center"
          >
            <input
              type="checkbox"
              :value="transmission"
              v-model="selectedTransmissions"
              class="form-check-input"
            />
            <label>{{ transmission }}</label>
          </div>
        </div>

        <div class="col-md-12 mt-4">
          <h5><i class="bi bi-currency-exchange"></i> Price Range</h5>
          <div
            v-for="(range, index) in [
              '0-1500000',
              '1500000-3000000',
              '3000000-20000000',
            ]"
            :key="index"
            class="d-flex align-items-center"
          >
            <input
              type="checkbox"
              :value="range"
              v-model="selectedPriceRanges"
              class="form-check-input"
            />
            <label>{{ range.replace("-", " to ") }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="card-grid">
      <div
        v-for="(car, idx) in filteredCars"
        :key="car.Brand + car.Model + idx"
        class="card shadow-sm mb-4"
      >
        <div v-if="showSuccess" class="alert alert-success" role="alert">
          Car deleted successfully.
        </div>

        <div class="image-container">
          <img :src="car.Images[0]" class="card-img-top" alt="Car Image" />
        </div>

        <div class="card-body">
          <h5 class="card-title text-center">
            {{ car.Brand }} {{ car.Model }}
          </h5>
          <span class="d-block text-center"
            >₹{{ car.Price.toLocaleString() }}</span
          >

          <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-primary w-48" @click="showCar(car._id)">
              Show Car
            </button>
            <button class="btn btn-danger w-48" @click="deleteCar(car._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCarStore } from "@/store/carStore";
import { storeToRefs } from "pinia";

const { cars, selectedCar } = storeToRefs(useCarStore());
const { fetchCars } = useCarStore();

onMounted(async () => {
  await fetchCars();
});

let title = "Car Inventory";
let selectedBrands = ref([]);
let selectedFuelTypes = ref([]);
let selectedCarTypes = ref([]);
let selectedTransmissions = ref([]);
let selectedPriceRanges = ref([]);

let searchText = ref("");

let showFilters = ref(false);
function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function getUniqueValues(array, key) {
  let uniqueValues = [];
  array.forEach((item) => {
    if (!uniqueValues.includes(item[key])) {
      uniqueValues.push(item[key]);
    }
  });
  return uniqueValues;
}

let filteredCars = computed(() => {
  let search = searchText.value.toLowerCase();
  return cars.value.filter((car) => {
    let matchesSearch =
      car.Brand.toLowerCase().includes(search) ||
      car.Model.toLowerCase().includes(search);

    let matchesBrand =
      selectedBrands.value.length === 0 ||
      selectedBrands.value.includes(car.Brand);

    let matchesFuelType =
      selectedFuelTypes.value.length === 0 ||
      selectedFuelTypes.value.includes(car["FuelType"]);

    let matchesCarType =
      selectedCarTypes.value.length === 0 ||
      selectedCarTypes.value.includes(car["CarType"]);

    let matchesTransmission =
      selectedTransmissions.value.length === 0 ||
      selectedTransmissions.value.includes(car.Transmission);

    let matchesPrice =
      selectedPriceRanges.value.length === 0 ||
      selectedPriceRanges.value.some((range) => {
        let [min, max] = range.split("-").map(Number);
        return car.Price >= min && car.Price <= max;
      });

    return (
      matchesSearch &&
      matchesBrand &&
      matchesFuelType &&
      matchesCarType &&
      matchesTransmission &&
      matchesPrice
    );
  });
});

const router = useRouter();
const carStore = useCarStore();

const showSuccess = ref(false);

function showCar(car_id) {
  router.push({ path: "/show-car/" + car_id });
}

async function deleteCar(car_id) {
  const confirmed = window.confirm("Are you sure you want to delete this car?");
  if (confirmed) {
    try {
      await carStore.deleteCar(car_id);
      showSuccess.value = true;

      setTimeout(() => {
        showSuccess.value = false;
      }, 3000);
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #fdfeff;
}

hr {
  border-top: 2px solid #606264;
}

.filters {
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  color: rgb(0, 0, 0);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.card {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

button {
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

button:hover {
  opacity: 0.9;
}

.card-img-top {
  object-fit: cover;
  width: 100%;
  height: 200px;
  border-bottom: 2px solid #ddd;
}

.alert {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 10;
  border-radius: 8px;
  font-size: 0.9rem;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  text-align: center;
}

input[type="text"] {
  font-size: 1rem;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

button {
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #343a40; /* Dark color for contrast */
  background-color: #f8f9fa; /* Light background color */
}

button:hover {
  opacity: 0.8;
  background-color: #8e252b; /* Change background to blue on hover */
  color: white; /* Change text color to white on hover */
}
</style>
