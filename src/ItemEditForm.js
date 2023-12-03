import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importez useParams
import axios from 'axios';
import Swal from 'sweetalert2';

function ItemEditForm($i) {
 
  const { itemId } = useParams(); // Utilisez useParams pour obtenir l'ID de l'élément
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetchItem(itemId);
  }, [itemId]);

  const fetchItem = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/items/${id}`);
      setItemName(response.data.nom);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const handleUpdate = async () => {
    const result = await Swal.fire({
      title: 'Voulez-vous mettre à jour cet élément ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:3001/items/${itemId}`, { name: itemName }); // Incluez le nom dans l'objet
        Swal.fire('Succès', 'Élément mis à jour avec succès !', 'success');
      } catch (error) {
        console.error('Error updating item:', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour de l\'élément.', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Modifier un élément</h2>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleUpdate}>Mettre à jour</button>
    </div>
  );
}

export default ItemEditForm;
