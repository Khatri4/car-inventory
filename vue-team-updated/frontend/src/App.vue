<template>
  <div>
    <nav
      v-if="route.path !== '/'"
      class="navbar navbar-expand-lg navbar-dark shadow-sm"
      style="background: rgba(143, 124, 124, 0.8)"
    >
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">CarHub</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/home-page"
                exact-active-class="active"
              >
                <i class="bi bi-house-door me-2"></i> Home
              </router-link>
            </li>
          </ul>

          <form class="d-flex ms-auto">
            <button
              v-on:click="showAddCarForm"
              class="btn btn-primary ms-2"
              type="button"
            >
              <i class="bi bi-plus-circle me-2"></i> Add Car
            </button>
          </form>
        </div>
      </div>
    </nav>

    <!-- Main content rendered here -->
    <router-view />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

function showAddCarForm() {
  router.push({ path: "/add-car" });
}
</script>

<style scoped>
.navbar {
  padding: 0.8rem 2rem;
  background-color: rgba(
    165,
    0,
    0,
    0.8
  ); /* Red background with some transparency */
  color: white;
}

.navbar-brand {
  font-size: 1.7rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}

.navbar-nav .nav-link {
  font-size: 1.1rem;
  color: #fff;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: #f8f9fa;
}

.navbar-nav .nav-link.active {
  color: #f39c12; /* Yellow color for active links */
}

.navbar-toggler-icon {
  background-color: #fff;
}

.navbar-toggler {
  border: none;
}

.btn-primary {
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
  background-color: #a50000; /* Dark red color for the button */
  border-radius: 25px;
  transition: background-color 0.3s ease;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #800000; /* Darker red when hovered */
}

.navbar .container-fluid {
  max-width: 1300px;
}

.ms-auto {
  margin-left: auto;
}

@media (max-width: 991px) {
  .navbar {
    padding: 1rem;
  }

  .navbar-nav .nav-link {
    font-size: 1rem;
  }

  .btn-primary {
    font-size: 0.9rem;
  }
}
</style>
