import { Router } from 'express';
import PadrinoController from '../controllers/Padrino.controller';

const padrinoRouter = Router();

padrinoRouter.get('/padrinos', PadrinoController.getPadrinos);
padrinoRouter.get('/padrinos/:id', PadrinoController.getPadrinoById);
padrinoRouter.post('/padrinos', PadrinoController.createPadrino);
padrinoRouter.put('/padrinos/:id', PadrinoController.updatePadrino);
padrinoRouter.delete('/padrinos/:id', PadrinoController.deletePadrino);
padrinoRouter.get('/padrinos/buscar/:nombre', PadrinoController.searchPadrinos);


export default padrinoRouter;
