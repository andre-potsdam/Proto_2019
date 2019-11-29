import { VehicleSelection } from 'src/app/shared/model/vehicle-selection.enum';

export class Page020VehicleStaticData {

    // vehicle selection choice
    static vehicleSelectionChoiceItems = [
        { value: VehicleSelection.HSN_TSN, labelKey: 'vehicleSelection_hsntsn_label' },
        { value: VehicleSelection.COMFORT_SEARCH, labelKey: 'vehicleSelection_comfortSearch_label' },
    ];

    // manufacturer
    static manufacturerItems = [
        { value: 'Audi', label: 'Audi' },
        { value: 'BMW', label: 'BMW' },
        { value: 'Ford', label: 'Ford' },
        { value: 'VW', label: 'VW' },
    ];

    // model
    static modelItems = [
        { value: 'Golf', label: 'Golf' },
        { value: 'Passat', label: 'Passat' },
        { value: 'Polo', label: 'Polo' },
        { value: 'Tiguan', label: 'Tiguan' },
    ];

    // fuel
    static fuelItems = [
        { value: 'Benzin', labelKey: 'fuel_benzin_label' },
        { value: 'Diesel', labelKey: 'fuel_diesel_label' },
    ];

    // financing
    static financingItems = [
        { value: 'false', labelKey: 'financing_no_label' },
        { value: 'true', labelKey: 'financing_yes_label' },
    ];
}