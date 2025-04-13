/**
 * Module Index
 * 
 * This file exports all module content data.
 */

import { verilogFundamentals } from './verilogFundamentals';
import { systemVerification } from './systemVerification';
import { fpgaDesign } from './fpgaDesign';
import { riscvProcessor } from './riscvProcessor';
import verilogChapters from './verilogChapters';

// Combine modules data with their chapters for front-end usage
const completeModules = [
  { 
    ...verilogFundamentals, 
    allChapters: verilogChapters,
    status: 'complete',
    progress: 100
  },
  { 
    ...systemVerification, 
    allChapters: [],
    status: 'coming-soon',
    progress: 0
  },
  { 
    ...fpgaDesign, 
    allChapters: [],
    status: 'coming-soon',
    progress: 0
  },
  { 
    ...riscvProcessor,
    status: 'complete',
    progress: 100
  }
];

export default completeModules;