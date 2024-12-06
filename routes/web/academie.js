const express = require("express");
// ** GENERAL ACADEMIE
const academieController = require("../../controllers/academie/academieController");
// ** ZONE A
const besanconController = require("../../controllers/academie/zone-a/besancon");
const bordeauxController = require("../../controllers/academie/zone-a/bordeaux");
const clermontFerrandController = require("../../controllers/academie/zone-a/clermont-ferrand");
const lyonController = require("../../controllers/academie/zone-a/lyon");
const poitiersController = require("../../controllers/academie/zone-a/poitiers");
const limogesController = require("../../controllers/academie/zone-a/limoges");
const grenobleController = require("../../controllers/academie/zone-a/grenoble");
const dijonController = require("../../controllers/academie/zone-a/dijon");
// ** ZONE B
const aixMarseilleController = require("../../controllers/academie/zone-b/aix-marseille");
const amiensController = require("../../controllers/academie/zone-b/amiens");
const caenController = require("../../controllers/academie/zone-b/caen");
const lilleController = require("../../controllers/academie/zone-b/lille");
const nancyMetzController = require("../../controllers/academie/zone-b/nancy-metz");
const nantesController = require("../../controllers/academie/zone-b/nantes");
const niceController = require("../../controllers/academie/zone-b/nice");
const orleansToursController = require("../../controllers/academie/zone-b/orléans-tours");
const reimsController = require("../../controllers/academie/zone-b/reims");
const rennesController = require("../../controllers/academie/zone-b/rennes");
const rouenController = require("../../controllers/academie/zone-b/rouen");
const strasbourgController = require("../../controllers/academie/zone-b/strasbourg");
// ** ZONE C
const creteilController = require("../../controllers/academie/zone-c/créteil");
const montpellierController = require("../../controllers/academie/zone-c/montpellier");
const parisController = require("../../controllers/academie/zone-c/paris");
const toulouseController = require("../../controllers/academie/zone-c/toulouse");
const versaillesController = require("../../controllers/academie/zone-c/versailles");
// ** ZONE CORSE
const corseController = require("../../controllers/academie/corse/corse");




const router = express.Router();
// ** ACADEMIE 
router.get("/", academieController.academie);

// ! ZONE A 
// **** besancon ********************************
router.get("/besancon-year-2024", besanconController.besancon2024);
router.get("/besancon-year-2025", besanconController.besancon2025);
// **** besancon END ********************************

// **** bordeaux ********************************
router.get("/bordeaux-year-2024", bordeauxController.bordeaux2024);
router.get("/bordeaux-year-2025", bordeauxController.bordeaux2025);
// **** bordeaux END ********************************

// **** clermont-ferrand ********************************
router.get("/clermont-ferrand-year-2024", clermontFerrandController.clermontFerrand2024);
router.get("/clermont-ferrand-year-2025", clermontFerrandController.clermontFerrand2025);
// **** clermont-ferrand END ********************************

// **** lyon ********************************
router.get("/lyon-year-2024", lyonController.lyon2024);
router.get("/lyon-year-2025", lyonController.lyon2025);
// **** lyon END ********************************

// **** poitiers ********************************
router.get("/poitiers-year-2024", poitiersController.poitiers2024);
router.get("/poitiers-year-2025", poitiersController.poitiers2025);
// **** poitiers END ********************************

// **** limoges ********************************
router.get("/limoges-year-2024", limogesController.limoges2024);
router.get("/limoges-year-2025", limogesController.limoges2025);
// **** limoges END ********************************

// **** grenoble ********************************
router.get("/grenoble-year-2024", grenobleController.grenoble2024);
router.get("/grenoble-year-2025", grenobleController.grenoble2025);
// **** grenoble END ********************************

// **** dijon ********************************
router.get("/dijon-year-2024", dijonController.dijon2024);
router.get("/dijon-year-2025", dijonController.dijon2025);
// **** dijon END ********************************


// ! ZONE B 

// **** Aix-Marseille ********************************
router.get("/aix-marseille-year-2024", aixMarseilleController.aixMarseille2024);
router.get("/aix-marseille-year-2025", aixMarseilleController.aixMarseille2025);
// **** Aix-Marseille END ****************************

// **** Amiens ***************************************
router.get("/amiens-year-2024", amiensController.amiens2024);
router.get("/amiens-year-2025", amiensController.amiens2025);
// **** Amiens END ***********************************

// **** Caen *****************************************
router.get("/caen-year-2024", caenController.caen2024);
router.get("/caen-year-2025", caenController.caen2025);
// **** Caen END *************************************

// **** Lille ****************************************
router.get("/lille-year-2024", lilleController.lille2024);
router.get("/lille-year-2025", lilleController.lille2025);
// **** Lille END ************************************

// **** Nancy-Metz ***********************************
router.get("/nancy-metz-year-2024", nancyMetzController.nancyMetz2024);
router.get("/nancy-metz-year-2025", nancyMetzController.nancyMetz2025);
// **** Nancy-Metz END *******************************

// **** Nantes ***************************************
router.get("/nantes-year-2024", nantesController.nantes2024);
router.get("/nantes-year-2025", nantesController.nantes2025);
// **** Nantes END ***********************************

// **** Nice *****************************************
router.get("/nice-year-2024", niceController.nice2024);
router.get("/nice-year-2025", niceController.nice2025);
// **** Nice END *************************************

// **** Orléans-Tours ********************************
router.get("/orleans-tours-year-2024", orleansToursController.orleansTours2024);
router.get("/orleans-tours-year-2025", orleansToursController.orleansTours2025);
// **** Orléans-Tours END ****************************

// **** Reims ****************************************
router.get("/reims-year-2024", reimsController.reims2024);
router.get("/reims-year-2025", reimsController.reims2025);
// **** Reims END ************************************

// **** Rennes ***************************************
router.get("/rennes-year-2024", rennesController.rennes2024);
router.get("/rennes-year-2025", rennesController.rennes2025);
// **** Rennes END ***********************************

// **** Rouen ****************************************
router.get("/rouen-year-2024", rouenController.rouen2024);
router.get("/rouen-year-2025", rouenController.rouen2025);
// **** Rouen END ************************************

// **** Strasbourg ***********************************
router.get("/strasbourg-year-2024", strasbourgController.strasbourg2024);
router.get("/strasbourg-year-2025", strasbourgController.strasbourg2025);
// **** Strasbourg END *******************************



// ! ZONE C
// **** Créteil ********************************
router.get("/creteil-year-2024", creteilController.creteil2024);
router.get("/creteil-year-2025", creteilController.creteil2025);
// **** Créteil END ****************************

// **** Montpellier ****************************
router.get("/montpellier-year-2024", montpellierController.montpellier2024);
router.get("/montpellier-year-2025", montpellierController.montpellier2025);
// **** Montpellier END ************************

// **** Paris **********************************
router.get("/paris-year-2024", parisController.paris2024);
router.get("/paris-year-2025", parisController.paris2025);
// **** Paris END ******************************

// **** Toulouse *******************************
router.get("/toulouse-year-2024", toulouseController.toulouse2024);
router.get("/toulouse-year-2025", toulouseController.toulouse2025);
// **** Toulouse END ***************************

// **** Versailles *****************************
router.get("/versailles-year-2024", versaillesController.versailles2024);
router.get("/versailles-year-2025", versaillesController.versailles2025);
// **** Versailles END *************************


// ! ZONE CORSE

// **** Corse *****************************
router.get("/corse-year-2024", corseController.corse2024);
router.get("/corse-year-2025", corseController.corse2025);
// **** Corse END *************************

module.exports = router;
