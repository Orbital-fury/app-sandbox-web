# App Sandbox

## Tasks

| Feature                                                                                                         | Status               |
|-----------------------------------------------------------------------------------------------------------------|----------------------|
| PC constraint create                                                                                            | :heavy_check_mark:   |
| PC constraint edit                                                                                              | :heavy_check_mark:   |
| PC constraint delete                                                                                            | :heavy_check_mark:   |
| Add toast service                                                                                               | :heavy_check_mark:   |
| throw Toast on create/update/delete success and all failures                                                    | :heavy_check_mark:   |
| PC element delete                                                                                               | :heavy_check_mark:   |
| Modify reset button when updating an existing resource                                                          | :heavy_check_mark:   |
| PC element create                                                                                               | :heavy_check_mark:   |
| PC element edit                                                                                                 | :heavy_check_mark:   |
| Rework DB to link PcConstraintEntity to PcElementType (need to update update-pc-element to manage element type) | :heavy_check_mark:   |
| On PC element create/edit, should fill what's the constraints and specifications are                            | :x:                  |
| Add and manage user connection                                                                                  | :x:                  |
| Add role regarding user and what they can do                                                                    | :x:                  |
| Try Angular 16 signals                                                                                          | :x:                  |

## Installation

Install Node.js ^16.14.0 || ^18.10.0 if needed.<br>
Run `npm install` to install dependencies.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## App architecture

- 2 applications in the web-service:
    - mmm (Manage measuring Machine), monitoring example
    - pc-builder, configuration example
- components, services and stores are separated between the 2 applications
- bootstrap used
- fontawesome used
- bootstrap loader in shared component
- [Shared module](/src/app/shared/shared.module.ts) and [core module](/src/app/core.module.ts) set up
- Home-made breadcrumb using ResolveFn
- Toastr used (`ngx-toastr`) with custom service and custom toasts

## mmm (Manage measuring Machine)

Similar to GCD by displaying machines data. Possibility to add new machine. Machines are displayed regarding if a maintenance is needed:
- using cards ![mmm_manage-machine](/documentation/mmm_manage-machine.PNG)
- using a custom table ![mmm_maintenance](/documentation/mmm_maintenance.PNG)

Display of metrics using `highcharts` (and `highcharts-angular`) ![mmm_manage-machine_machine](/documentation/mmm_manage-machine_machine.PNG)

### Structure

- Several factories
- Several machines in factories
- Several monitored metrics for each machines
- Dashboard with graphics and table report

### Highlights

- specific outlet to display a second menu [here](/src/app/components/mmm/mmm.component.html)
- `highcharts` used to display graphics [here](/src/app/components/mmm/manage-machine/machine/machine-metric/machine-metric.component.ts)
- `angular-ng-autocomplete` used for autocomplete [here](/src/app/components/mmm/manage-machine/manage-machine.component.ts)
- `@swimlane/ngx-datatable` used for custom dynamic table [here](/src/app/components/mmm/maintenance/maintenance.component.ts)
- Reactive form used [here](/src/app/components/mmm/manage-machine/update-machine/update-machine.component.ts)
![mmm_add-machine](/documentation/mmm_add-machine.PNG)

## pc-builder

The pc-builder part is an example of how to configure hardware with constraints between elements composing the configuration.

### Structure

- User select an element type (CPU, Case, GPU, RAM, MoBo, etc), then select a PC element he wants to add to the current PC build
- When PC elements are in PC build, the possible selection will adjust automatically regarding all the PC build constraints
![pc-builder_1](/documentation/pc-builder_1.PNG)
- All PC elements are retrieved at first, then the logic is made with the Front-end (in order to select the PC elements and adjust the selection)
- If the logic is made in the Back-end it will take 0.1 second instead of 0.01 second to get the new PC element selection regarding what are the PC elements in the current build. Tests have been made... maybe use another DB structure to prevent this
![pc-builder_2](/documentation/pc-builder_2.PNG)
- An admin panel has been made to manage PC elements and PC constraints. CRUD operations can be operated here
![pc-builder_manage-elements](/documentation/pc-builder_manage-elements.PNG)

### Highlights

- [ngrx/store used with pc-builder](/src/app/store/pc-builder)
- service used for communication between component parent and child, [example here](/src/app/services/pc-builder/element-type-choice.service.ts)
- custom pipe (currency pipe) [here](/src/app/components/pc-builder/currency-pipe/currency-pipe.component.ts)
- Reactive form used [here](/src/app/components/pc-builder/manage-pc-builder/manage-pc-element/update-pc-element/update-pc-element.component.ts)
![pc-builder_manage-elements_add-element](/documentation/pc-builder_manage-elements_add-element.PNG)
- Modal used when a resource is about to be deleted. Several information can be retrieved and displayed to help the user about what's going to happen
![pc-builder_manage-constraints_modal-delete](/documentation/pc-builder_manage-constraints_modal-delete.PNG)

## ngrx/store

### Schematics

- action: `ng g a`
- effect: `ng g ef`
- reducer: `ng g r`
- store: `ng g st`
- selector: `ng g se`

### component-store

Example of a component-store [here](/src/app/store/component-store/pc-builder.store.ts)

## Front utilities

- Bootstrap: Company clean style
- [Material](https://material.angular.io/): official components library
- [PrimeNG](https://primeng.org/): considered most powerful, highly customizable
- [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/): is preferred over ng-bootstrap
- [ng-bootstrap](https://ng-bootstrap.github.io/): angular widget using Bootstrap CSS (feature like: toast with prevent autohide on mouseover)
- [Swimlane](https://swimlane.github.io/ngx-ui/card): Grey-color scale display with neon style. Examples:
    - [Card](https://swimlane.github.io/ngx-ui/card)
    - [Notification](https://swimlane.github.io/ngx-ui/notification)
    - [Corner menu](https://swimlane.github.io/ngx-ui/plus-menu)
    - [Stepper](https://swimlane.github.io/ngx-ui/stepper)
- [Syncfusion](https://www.syncfusion.com/angular-components)

## Good practices

- Explicit public method (?):
    - https://typescript-eslint.io/rules/explicit-member-accessibility/
    - https://stackoverflow.com/questions/36943888/typescript-classes-is-explicit-public-modifier-a-best-practice

### Questions

- Using modal (to delete resources), should I use @Input() to pass object ? Or should I use the store ? And if no store, should I request to the API ?