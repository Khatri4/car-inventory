<!-- <script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCarStore } from "@/store/carStore";

const props = defineProps({
  car_image: String,
  car_model: String,
  price: Number,
  car_brand: String,
  car_id: String,
});

const router = useRouter();
const carStore = useCarStore();

const carName = computed(() => {
  return props.car_brand + " " + props.car_model;
});

const showSuccess = ref(false);

function showCar() {
  router.push({ path: "/show-car/" + props.car_id });
}

async function deleteCar() {
  const confirmed = window.confirm("Are you sure you want to delete this car?");
  if (confirmed) {
    try {
      await carStore.deleteCar(props.car_id);
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

<template>
  <div class="card-grid">
    <div class="card" style="width: 300px; height: 420px">
      <div
        v-if="showSuccess"
        class="alert alert-success"
        role="alert"
        style="
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          z-index: 10;
          border-radius: 8px;
        "
      >
        Car deleted successfully.
      </div>

      <div class="image-container">
        <img :src="props.car_image" class="card-img-top" alt="Car Image" />
      </div>

      <div class="card-body d-flex flex-column justify-content-between p-3">
        <h5
          class="card-title text-center text-dark mb-2"
          style="font-size: 1.2rem; font-weight: bold"
        >
          {{ carName }}
        </h5>
        <span
          class="text-center text-muted"
          style="font-size: 1rem; font-weight: normal"
          >₹{{ props.price.toLocaleString() }}</span
        >

        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-primary w-48" @click="showCar()">
            Show Car
          </button>
          <button class="btn btn-danger w-48" @click="deleteCar()">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.card-img-top {
  object-fit: cover;
  width: 100%;
  height: 200px;
  border-bottom: 2px solid #ddd;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 10px;
}

.image-container img {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
}

.card-body span {
  font-size: 1rem;
  color: #777;
}

button {
  font-size: 0.9rem;
}

button:hover {
  opacity: 0.9;
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
}
</style> -->

<script></script>
<template></template>
