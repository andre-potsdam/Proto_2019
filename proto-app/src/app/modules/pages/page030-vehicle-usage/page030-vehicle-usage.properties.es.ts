import {Page030VehicleUsageProperties} from './page030-vehicle-usage.properties';

export class Page030VehicleUsagePropertiesEs implements Page030VehicleUsageProperties {

    // página global
    pageHeader = null;

    // grupo de uso del vehículo
    vehicleUsageGroup_title = null;
    vehicleUsageGroup_description = null;


    // uso hijo
    usageKind_rowLabel = '¿Cómo se usa el vehículo?';
    usageKind_infoText = `
        <b> ¿Uso privado o comercial? </ b> <br>
        Usted usa su automóvil solo de forma privada durante su tiempo libre y para ir al trabajo,
        luego seleccione "Privado (incluidos los viajes al trabajo)".
        Utiliza su automóvil para viajes de trabajo / negocios y placer,
        luego elija "Empresa y Privado"`;

    usageKind_private_label = 'Privado (incluidos los viajes al trabajo)';
    usageKind_business_label = 'Empresa y privado';


    // kilometraje
    milage_rowLabel = '¿Cuántas millas maneja por año?';
    milage_postfix = '.000 km';
    milage_infoText = '<b> Kilometraje anual </ b> <br> Ingrese el kilometraje anual solo en miles, entonces z. Por ejemplo, 20 si conduce 20,000 km al año. ';


    // elección del plato de temporada
    seasonPlateChoice_rowLabel = '¿Quieres un indicador de temporada?';
    seasonPlateChoice_infoText = '<b> Indicador de temporada </ b> <br> Se puede aplicar un indicador de temporada por un período de al menos 1 mes.';

    seasonPlateChoice_no_label = 'no';
    seasonPlateChoice_yes_label = 'sí';

    // comienza el plato de temporada
    seasonPlateBegin_rowLabel = 'desde';
    seasonPlateBegin_infoText = null;

    // final de placa de temporada
    seasonPlateEnd_rowLabel = 'a';
    seasonPlateEnd_infoText = null;

    month_1_label = 'enero';
    month_2_label = 'febrero';
    month_3_label = 'marzo';
    month_4_label = 'April';
    month_5_label = 'mayo';
    month_6_label = 'junio';
    month_7_label = 'Julio';
    month_8_label = 'agosto';
    month_9_label = 'septiembre';
    month_10_label = 'octubre';
    month_11_label = 'noviembre';
    month_12_label = 'diciembre';

    // propiedad de la vivienda
    homeOwnership_rowLabel = '¿Es dueño de una propiedad?';
    homeOwnership_infoText = null;

    homeOwnership_noInformation_label = 'no especificado';
    homeOwnership_noOwnership_label = 'sin propiedad de la vivienda';
    homeOwnership_ownFlat_label = 'Apartamento';
    homeOwnership_ownHouse_label = 'casa';

    // plaza de aparcamiento
    parkingPlace_rowLabel = '¿Dónde estaciona la mayor parte del vehículo?';
    parkingPlace_infoText = null;

    parkingPlace_garage_label = 'Garaje individual / Garaje doble';
    parkingPlace_parkhouse_label = 'Estacionamiento, estacionamiento';
    parkingPlace_street_label = 'Calle, estacionamiento, otro';
    parkingPlace_carport_label = 'Cochera, terreno privado';


    // botón de enviar
    submitButton_label = 'Siguiente';

}
