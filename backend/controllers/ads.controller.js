import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Advertisment from '../models/advertisment.model.js';
import Seen from '../models/log.model.js';

// Get Ads
export const getAds = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const ads = await Advertisment.find({ published: "published", enabled: true }) // Corrected filter for published ads
            .sort({ createdAt: -1 }) // Sort by creation date, descending
            .skip(offset) // Ensure proper pagination
            .limit(16);

        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search Ads
export const searchAds = async (req, res) => {
    const {
        Titre,
        Location,
        TypeBien,
        MinPrix,
        MaxPrix,
        MinSurface,
        MaxSurface,
        Pcs,
    } = req.query;

    const query = { published: "published", enabled: true }; // Corrected filter for published ads

    if (Titre) query.title = { $regex: Titre, $options: 'i' };
    if (Location) query.adresse = { $regex: Location, $options: 'i' };
    if (TypeBien) query.type = TypeBien;
    if (MinPrix) query.price = { $gte: parseInt(MinPrix, 10) };
    if (MaxPrix) query.price = { ...query.price, $lte: parseInt(MaxPrix, 10) };
    if (MinSurface) query.surface = { $gte: parseInt(MinSurface, 10) };
    if (MaxSurface) query.surface = { ...query.surface, $lte: parseInt(MaxSurface, 10) };
    if (Pcs) query.pcs = parseInt(Pcs, 10);

    try {
        const ads = await Advertisment.find(query)
            .limit(30)
            .sort({ createdAt: -1 }); // Sort by creation date, descending

        res.json(ads);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Get Ad by ID
export const getAdById = async (req, res) => {
    try {
        const advertismentId = req.params.advertismentId;
        const token = req.cookies.jwt || req.headers.token;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                const user = await User.findById(decoded.userId);

                if (user && !user.seen.includes(advertismentId)) {
                    user.seen.push(advertismentId);
                    await user.save();
                }
            } catch (error) {
                console.error("Invalid token", error);
            }
        }

        const ad = await Advertisment.findById(advertismentId)
            .populate({
                path: 'createdBy',
                select: 'FirstName LastName username profile_pic tel',
            })
            .select('-updatedAt');

        if (!ad) {
            return res.status(404).json({ error: 'Advertisement not found' });
        }

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (!ad.seen.includes(ip)) {
            ad.seen.push(ip);
            await ad.save();
        }

        const seen = new Seen({
            ad: ad._id,
            ip: ip || "",
        });
        await seen.save();

        res.status(200).json({ data: ad });
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred' });
    }
};

// Get Total Pages
export const totalPages = async (req, res) => {
    try {
        const AdCount = await Advertisment.countDocuments({ published: "published", enabled: true });
        const pages = Math.ceil(AdCount / 16); // Use Math.ceil to round up

        res.status(200).json({ countPages: pages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
