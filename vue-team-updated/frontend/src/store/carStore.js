import { defineStore } from "pinia";
import axios from 'axios';

export const useCarStore = defineStore("carStore", {
  state: () => ({
    cars: [],
    selectedCar: null,
  }),
  actions: {
    async fetchCars() {
      try {
        const response = await fetch("http://localhost:5050/api/cars/");
        const data = await response.json();
        this.cars = data;
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    },


    async addCar(carData, images = []) {
      try {
        const formData = new FormData();
        for (const key in carData) {
          formData.append(key, carData[key]);
        }
        images.forEach((img) => formData.append("Images", img));

        const response = await fetch("http://localhost:5050/api/cars/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text(); // show the raw HTML or error
          throw new Error(`HTTP ${response.status}:\n${errorText}`);
        }

        const data = await response.json();
        this.cars.push(data);
      } catch (error) {
        console.error("Failed to add car:", error);
      }
    },
    async deleteCar(carId) {
      try {
        await fetch(`http://localhost:5050/api/cars/${carId}`, {
          method: "DELETE",
        });
        this.cars = this.cars.filter((car) => car._id !== carId);
      } catch (error) {
        console.error("Failed to delete car:", error);
      }
    },

    async fetchCarById(carId) {
      try {
        const response = await fetch(`http://localhost:5050/api/cars/${carId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch car with ID ${carId}`);
        }
        const data = await response.json();
        this.selectedCar = data;
        return data;
      } catch (error) {
        console.error("Failed to fetch car by ID:", error);
        throw error;
      }
    },
    async updateCar(carId, updatedData) {
      try {
        const response = await fetch(`http://localhost:5050/api/cars/${carId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
    
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    
        return await response.json();
      } catch (error) {
        console.error("Failed to update car details:", error);
        throw error;
      }
    },

    // async updateCar(id, carData, imageFiles) {
    //   const formData = new FormData();
    
    //   for (const key in carData) {
    //     formData.append(key, carData[key]);
    //   }
    
    //   imageFiles.forEach((file) => {
    //     formData.append('images', file); // 'images' matches the multer field name
    //   });
    
    //   try {
    //     const response = await fetch(`http://localhost:5050/api/cars/${id}`, {
    //       method: "PUT",
    //       body: formData,
    //     });
    
    //     if (!response.ok) {
    //       const errText = await response.text();
    //       throw new Error(`HTTP ${response.status}: ${errText}`);
    //     }
    
    //     const updatedCar = await response.json();
    //     this.selectedCar = updatedCar;
    
    //     await this.fetchCars(); 
    
    //     return updatedCar;
    //   } catch (error) {
    //     console.error("Failed to update car:", error);
    //     throw error;
    //   }
    // },
    
    
    setSelectedCar(car) {
      this.selectedCar = car;
    },
  },
});
