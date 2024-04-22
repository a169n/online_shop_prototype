import React, { useState, useEffect } from "react";
import { useGetRestaurantsQuery } from "../../../redux/services/restaurantsApi";
import { useCreateNewFoodMutation } from "../../../redux/services/foodsApi";
import "./style.css";

const CreateDishModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [restaurantCategories, setRestaurantCategories] = useState([]);

  const { data: restaurants, isLoading, isError } = useGetRestaurantsQuery("");
  const [createFood] = useCreateNewFoodMutation();

  useEffect(() => {
    if (restaurant) {
      const selectedRestaurant = restaurants.find((r) => r._id === restaurant);
      if (selectedRestaurant) {
        setRestaurantCategories(selectedRestaurant.categories);
      }
    }
  }, [restaurant, restaurants]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("restaurant", restaurant);
      formData.append("image", image);

      await createFood(formData).unwrap();
      setSuccessMessage("Food created successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setRestaurant("");
      setCategory("");
      setImage(null);
    } catch (error) {
      setErrorMessage("Failed to create food. Please try again.");
      console.error(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching restaurants</p>;

  return (
    <div className="dish-create-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Create New Dish</h2>
        <form onSubmit={handleSubmit} className="dish-create-form">
          <label htmlFor="dish-name">Name:</label>
          <input
            type="text"
            id="dish-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="dish-price">Price:</label>
          <input
            type="number"
            id="dish-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="dish-description">Description:</label>
          <input
            type="text"
            id="dish-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="dish-restaurant">Restaurant:</label>
          <select
            id="dish-restaurant"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            required>
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <label htmlFor="dish-category">Category:</label>
          <select
            id="dish-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required>
            <option value="">Select Category</option>
            {restaurantCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="dish-image">Image:</label>
          <input
            type="file"
            id="dish-image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateDishModal;
