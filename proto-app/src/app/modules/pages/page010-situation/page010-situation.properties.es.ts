import {Page010SituationProperties} from './page010-situation.properties';

export class Page010SituationPropertiesEs implements Page010SituationProperties {

        // página global
        pageHeader = null;

        // grupo de situación
        situationGroup_title = null;
        situationGroup_description = null;

        // elección de situación
        situationChoice_rowLabel = '¿Para qué vehículo desea calcular la contribución del seguro?';
        situationChoice_infoText = `<b> Situación </ b> <br>
                                        ¡Esta selección es importante! <br> Por favor decida cuidadosamente :) `;
        situationChoice_existingCar_label = 'Para su automóvil actual';
        situationChoice_newCar_label = 'Para un vehículo que desea comprar';

        // el seguro comienza la elección
        insuranceBeginChoice_rowLabel = 'inicio del seguro';
        insuranceBeginChoice_infoText = `<b> Insurrección </ b> <br>
                                        Es posible un cambio de seguro el 1.1.2020 sin previo aviso. <br>
                                        Cualquier otra cita también es posible.`;

        insuranceBeginChoice_01012020_label = '01 .01.2020 ';
        insuranceBeginChoice_anotherDate_label = 'En otra fecha';

        // fecha de inicio del seguro
        insuranceBeginDate_rowLabel = null;
        insuranceBeginDate_infoText = null;

       // botón de enviar
        submitButton_label = 'Siguiente';

}
