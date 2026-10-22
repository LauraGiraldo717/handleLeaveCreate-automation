/**
 * @file POM de Leave > Assign Leave (asignar licencia a un empleado).
 * Capa: pages. Solo locators; los campos comunes están en components/LeaveForm.js.
 */

/** @typedef {import('playwright').Page} Page */

/** @param {string} text */
const escapeRe = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const AssignLeavePage = {
  /** @param {Page} page */
  heading: (page) => page.getByRole('heading', { name: 'Assign Leave' }),
  /**
   * Autocompletado de empleado. No tiene label asociado; su placeholder es fijo
   * ("Type for hints...") y único en la pantalla (conteo 1 confirmado).
   * @param {Page} page
   */
  employeeName: (page) => page.getByPlaceholder('Type for hints...'),
  /**
   * Sugerencia del autocompletado. La app muestra el nombre completo (con segundos nombres),
   * por eso se busca "Nombre ... Apellido".
   * @param {Page} page @param {string} firstName @param {string} lastName
   */
  employeeOption: (page, firstName, lastName) =>
    page.getByRole('option', { name: new RegExp(`^${escapeRe(firstName)}\\b.*\\b${escapeRe(lastName)}$`) }),
  /** @param {Page} page */
  assignButton: (page) => page.getByRole('button', { name: 'Assign', exact: true }),
  /**
   * Diálogo "Confirm Leave Assignment" ("Employee does not have sufficient leave balance...").
   * Confirmado en HLC-TC-007 (no aparece en todos los casos: en HLC-TC-006 no se mostró).
   * @param {Page} page
   */
  confirmDialog: (page) => page.getByRole('dialog'),
  /** Botón "Ok" del diálogo: acepta asignar pese al saldo insuficiente. @param {Page} page */
  confirmButton: (page) => page.getByRole('dialog').getByRole('button', { name: 'Ok', exact: true }),
};
