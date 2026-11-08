import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

function Ingredients() {
  // Stocker la liste des ingrédients
  const [ingredients, setIngredients] = useState([]);

  // Stocker les valeurs saisies dans le formulaire
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");

  // Stocker l'ID de l'ingrédient à modifier
  // null signifie qu'on n'est pas en mode modification
  const [editingId, setEditingId] = useState(null);

  // Récupérer tous les ingrédients de l'utilisateur
  const getIngredients = useCallback(async () => {
    try {
      // Récupérer le token JWT après la connexion
      const token = localStorage.getItem("access");

      // Envoyer une requête GET à Django
      const response = await api.get("ingredients/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mettre à jour la liste avec les données reçues
      setIngredients(response.data);
    } catch (error) {
      console.log(error);
      alert("Could not load ingredients.");
    }
  }, []);

  // Charger les ingrédients automatiquement à l'ouverture de la page
  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  // Ajouter un nouvel ingrédient
  const handleAdd = async (e) => {
    // Empêcher le rechargement de la page
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      // Envoyer les informations à Django avec POST
      await api.post(
        "ingredients/",
        {
          name: name,
          quantity: quantity,
          unit: unit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Vider le formulaire après l'ajout
      setName("");
      setQuantity(1);
      setUnit("");

      // Actualiser la liste des ingrédients
      await getIngredients();

      alert("Ingredient added successfully!");
    } catch (error) {
      console.log(error.response?.data);
      alert("Could not add ingredient.");
    }
  };

  // Sélectionner un ingrédient à modifier
  const handleEdit = (ingredient) => {
    // Enregistrer son ID
    setEditingId(ingredient.id);

    // Remplir le formulaire avec ses informations actuelles
    setName(ingredient.name);
    setQuantity(ingredient.quantity);
    setUnit(ingredient.unit);
  };

  // Modifier un ingrédient existant
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      // Envoyer les nouvelles informations avec PATCH
      // editingId permet d'identifier l'ingrédient à modifier
      await api.patch(
        `ingredients/${editingId}/`,
        {
          name: name,
          quantity: quantity,
          unit: unit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Quitter le mode modification
      setEditingId(null);

      // Vider le formulaire
      setName("");
      setQuantity(1);
      setUnit("");

      // Actualiser la liste
      await getIngredients();

      alert("Ingredient updated successfully!");
    } catch (error) {
      console.log(error.response?.data);
      alert("Could not update ingredient.");
    }
  };

  // Supprimer un ingrédient
  const handleDelete = async (id) => {
    // Demander une confirmation avant la suppression
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ingredient?",
    );

    // Si l'utilisateur annule, arrêter la fonction
    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("access");

      // Envoyer une requête DELETE à Django
      await api.delete(`ingredients/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualiser la liste après la suppression
      await getIngredients();

      alert("Ingredient deleted successfully!");
    } catch (error) {
      console.log(error.response?.data);
      alert("Could not delete ingredient.");
    }
  };

  // Annuler la modification en cours
  const handleCancel = () => {
    // Revenir au mode ajout
    setEditingId(null);

    // Réinitialiser les champs
    setName("");
    setQuantity(1);
    setUnit("");
  };

  return (
    <div>
      <h1>My Refrigerator</h1>

      {/* Le titre change selon le mode : ajout ou modification */}
      <h2>{editingId ? "Edit an Ingredient" : "Add an Ingredient"}</h2>

      {/* Le formulaire choisit la fonction selon le mode */}
      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        {/* Champ du nom */}
        <input
          type="text"
          placeholder="Ingredient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Champ de la quantité */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="0.1"
          step="0.1"
          required
        />

        {/* Champ de l'unité */}
        <input
          type="text"
          placeholder="Unit (kg, pieces...)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />

        {/* Bouton qui change selon le mode */}
        <button type="submit">
          {editingId ? "Update Ingredient" : "Add Ingredient"}
        </button>

        {/* Afficher Cancel uniquement pendant la modification */}
        {editingId && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      <h2>My Ingredients</h2>

      {/* Vérifier si la liste est vide */}
      {ingredients.length === 0 ? (
        <p>No ingredients yet.</p>
      ) : (
        // Afficher chaque ingrédient de la liste
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {/* Afficher les informations */}
              {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              {/* Bouton pour modifier */}
              <button onClick={() => handleEdit(ingredient)}>Edit</button>
              {/* Bouton pour supprimer */}
              <button onClick={() => handleDelete(ingredient.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Ingredients;
