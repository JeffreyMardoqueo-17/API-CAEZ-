import { Router } from 'express';
import PadrinoController from '../controllers/Padrino.controller';
import {ValidatePostPadrino, ValidatePutPadrino, ValidateSearchPadrino} from '../validators/Padrino.validator'

const padrinoRouter = Router();

padrinoRouter.get('/padrinos', PadrinoController.getPadrinos);
padrinoRouter.get('/padrinos/:id', PadrinoController.getPadrinoById);
padrinoRouter.post('/padrinos',ValidatePostPadrino, PadrinoController.createPadrino);
padrinoRouter.put('/padrinos/:id',ValidatePutPadrino, PadrinoController.updatePadrino);
padrinoRouter.delete('/padrinos/:id', PadrinoController.deletePadrino);
padrinoRouter.post('/padrinos/buscar/',ValidateSearchPadrino, PadrinoController.searchPadrinos);


export default padrinoRouter;
