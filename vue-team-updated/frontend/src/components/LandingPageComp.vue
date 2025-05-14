<template>
  <section class="min-vh-100 d-flex align-items-center">
    <div class="container-main w-100">
      <div class="row align-items-center justify-content-between">
        <div
          class="col-md-6 d-flex flex-column justify-content-between"
          style="height: 100%"
        >
          <div class="text-center text-md-start">
            <h1>{{ currentCar.name }}</h1>
            <div class="subheading">Featured Car</div>
          </div>
          <div class="mt-auto text-center text-md-start">
            <router-link
              to="/home-page"
              class="btn btn-outline-light btn-lg px-5 mt-5"
            >
              View All Cars
            </router-link>
          </div>
        </div>

        <div class="col-md-6">
          <div
            id="carCarousel"
            class="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            ref="carouselRef"
          >
            <div class="carousel-inner">
              <div
                v-for="(car, index) in cars"
                :key="index"
                :class="['carousel-item', { active: index === 0 }]"
                :data-name="car.name"
                :data-description="car.description"
                :data-price="car.price"
              >
                <img
                  :src="car.image"
                  class="d-block w-100 car-image"
                  :alt="car.name"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carCarousel"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carCarousel"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>

          <div class="mt-4">
            <div class="product-title">Product</div>
            <p class="product-description">{{ currentCar.description }}</p>
            <button class="btn-description">Show Description</button>
            <div class="price-section mt-4">Showroom Price</div>
            <div class="price">{{ currentCar.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  name: "FeaturedCars",
  setup() {
    const carouselRef = ref(null);

    const cars = [
      {
        name: "BMW X5",
        description:
          "As BMW's flagship luxury SUV, the X7 offers immense space, opulent interiors, and a commanding presence...",
        price: "₹1,50,00,000",
        image: "./public/bmw1.avif",
      },
      {
        name: "BMW i7",
        description:
          "The BMW i7 is a fully electric luxury sedan representing the pinnacle of electric mobility...",
        price: "₹2,10,00,000",
        image: "./public/bmw_i7.avif",
      },
      {
        name: "Tata NexonEV",
        description:
          "The Tata Nexon is a sub-compact SUV that has gained recognition for its safety features...",
        price: "₹16,00,000",
        image: "./public/nexonEV.avif",
      },
      // Add the rest of the car objects similarly...
    ];

    const currentCar = reactive({ ...cars[0] });

    onMounted(() => {
      const carouselEl = carouselRef.value;
      carouselEl.addEventListener("slid.bs.carousel", () => {
        const active = carouselEl.querySelector(".carousel-item.active");
        currentCar.name = active.dataset.name;
        currentCar.description = active.dataset.description;
        currentCar.price = active.dataset.price;
      });
    });

    return {
      carouselRef,
      currentCar,
      cars,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #a50000, #000000);
  color: white;
  padding: 0;
}

.container-main {
  padding: 60px 40px;
}

h1 {
  font-size: 72px;
  font-weight: 800;
}

.subheading {
  font-size: 36px;
  font-weight: 600;
  color: #ff9999;
  margin-top: 10px;
}

.product-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
}

.product-description {
  font-size: 16px;
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.btn-description {
  background-color: #660000;
  color: white;
  padding: 10px 25px;
  border-radius: 8px;
  border: none;
}

.btn-description:hover {
  background-color: #4d0000;
}

.car-image {
  max-height: 360px;
  object-fit: cover;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  transition: transform 0.6s ease;
}

.carousel-item {
  transition: transform 0.8s ease-in-out;
}

.price-section {
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
}

.price {
  font-size: 40px;
  font-weight: 800;
}

@media (max-width: 768px) {
  .container-main {
    padding: 30px 20px;
    text-align: center;
  }

  h1 {
    font-size: 48px;
  }

  .subheading {
    font-size: 24px;
  }

  .row {
    flex-direction: column;
    align-items: center;
  }

  .product-description {
    max-width: 100%;
  }
}
</style>
