// Import module data
import { verilogFundamentals } from './modules/verilogFundamentals';
import { riscvProcessor } from './modules/riscvProcessor';

// Define all modules
const modules = [
  verilogFundamentals,
  riscvProcessor
];

// Function to get module by ID
export const getModuleById = (id) => {
  // First try direct match (for string IDs like "verilog-fundamentals")
  const directMatch = modules.find(module => module.id === id);
  if (directMatch) return directMatch;
  
  // Try numeric ID match (for ID values from Modules.jsx)
  if (!isNaN(id)) {
    const numericId = parseInt(id, 10);
    if (numericId === 1) return verilogFundamentals;
    if (numericId === 23) return riscvProcessor;
  }
  
  return null;
};

// Export all modules
export default modules; 