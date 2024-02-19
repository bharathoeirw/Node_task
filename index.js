const express = require('express');
const Sequelize = require('sequelize')
const connection = require('./Database/connection');
const PartDetails = require('./Model/partDetails');

const app = express();
const port = 3021;
app.use(express.json());
const router = express.Router();

// Add Parts

router.post('/addParts', async (req, res) => {
    try {
        const { itemName, itemRating, reviewCount, price } = req.body;
        const newPartDetails = await PartDetails.create({
            itemName,
            itemRating,
            reviewCount,
            price,
        });
        res.json(newPartDetails);
    } catch (error) {
        console.error('Error while adding part:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
});


// Get Parts
router.get('/getPartDetails', async (req, res) => {
    try {
        const partDetails = await PartDetails.findAll(); 
        res.json(partDetails);
    } catch (error) {
        console.error('Error fetching part details:', error); 
        res.status(500).json({ error: 'Internal Server error' });
    }
});

// Get Part by review 
router.get('/getPartsByReview', async (req, res) => {
    try {
        const { reviewCount } = req.query;

        if (!reviewCount) {
            return res.status(400).json({ error: 'Review Count required' });
        }

        const parts = await PartDetails.findAll({
            where: { reviewCount: reviewCount }
        });

        if (parts && parts.length > 0) {
            res.json(parts);
        } else {
            return res.status(404).json({ error: 'No parts available for the given review count' });
        }
    } catch (error) {
        console.error('Error while fetching parts by review count:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

// Get Part by rating
router.get('/getPartByRating', async (req, res) => {
    try {
        const { itemRating } = req.query;

        if (!itemRating) {
            return res.status(400).json({ error: 'Item rating is required' });
        }

        const parts = await PartDetails.findAll({
            where: { itemRating: { [Sequelize.Op.gte] : itemRating } }, // Retrieve parts with rating greater than or equal to 5
        });

        if (parts && parts.length > 0) {
            res.json(parts);
        } else {
            return res.status(404).json({ error: 'No parts available for the given rating' });
        }
    } catch (error) {
        console.error('Error while fetching parts by rating:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
});



app.use('/api', router);

// Database connection
connection
    .sync()
    .then(() => {
        console.log('Database synced successfully');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
