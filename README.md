# App Sandbox

## Tasks

- Develop PC element manager (choice between element and constraint) => add, edit, delete

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

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

## mmm (Manage measuring Machine)

Similar to GCD by displaying machines data. Possibility to add new machine. Machines are displayed regarding if a maintenance is needed:
- using cards ![mmm_manage-machine](/documentation/mmm_manage-machine.PNG)
- using a custom table ![mmm_maintenance](/documentation/mmm_maintenance.PNG)

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

- User select an element type (CPU, Case, GPU, RAM, MoBo, etc), then select a PC element to add to the current PC build
- When PC elements are in PC build, it will adjust the possible selection regarding PC build constraints
![pc-builder_1](/documentation/pc-builder_1.PNG)
- All PC elements are retrieved at first, then the logic is made with the Front-end (in order to select the PC elements and adjust the selection)
- If the logic is made in the Back-end it will take 0.1 second instead of 0.01 second to get the new PC element selection regarding what are the PC elements in the current build. Tests have been made... maybe use another DB structure to prevent this
![pc-builder_2](/documentation/pc-builder_2.PNG)

### Highlights

- [ngrx/store used with pc-builder](/src/app/store/pc-builder)
- service used for communication between component parent and child, [example here](/src/app/services/pc-builder/element-type-choice.service.ts)
- custom pipe (currency pipe) [here](/src/app/components/pc-builder/currency-pipe/currency-pipe.component.ts)

## ngrx/store

### Schematics

- action: `ng g a`
- effect: `ng g ef`
- reducer: `ng g r`
- store: `ng g st`
- selector: `ng g se`

### component-store

Example of a component-store, [here (ts file)](/src/app/store/component-store/pc-builder.store.ts)
