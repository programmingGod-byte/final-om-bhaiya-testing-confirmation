const chapter2 = {
  id: 2,
  title: "RISC-V Instruction Set Architecture",
  description: "Detailed exploration of the RISC-V instruction formats and extensions",
  estimatedTime: "3 hours",
  completed: false,
  sections: [
    {
      id: "2.1",
      title: "Base Integer ISAs",
      content: `
        <h3>Foundation of RISC-V: The Base Integer ISAs</h3>
        <p>The RISC-V base integer ISAs form the mandatory foundation of any RISC-V implementation. These base ISAs are carefully designed to be simple yet complete, providing all the essential functionality for a general-purpose processor.</p>

        <h4>RV32I: The 32-bit Base Integer ISA</h4>
        <p>RV32I is the foundational 32-bit integer instruction set, designed to be sufficient for a complete compiler target and minimal operating system implementation.</p>
        <ul>
          <li><strong>Register Set</strong>: 32 general-purpose 32-bit registers (x0-x31), with x0 hardwired to 0</li>
          <li><strong>PC Width</strong>: 32-bit program counter</li>
          <li><strong>Memory Access</strong>: 32-bit address space with byte-addressable memory</li>
          <li><strong>Instruction Count</strong>: Only 47 instructions (40 unique instructions, some encoded differently for different operand types)</li>
          <li><strong>Instruction Width</strong>: All instructions are 32 bits</li>
          <li><strong>Design Philosophy</strong>: Minimalist approach that still provides complete functionality</li>
        </ul>
        
        <p>Key instruction categories in RV32I include:</p>
        <ul>
          <li><strong>Integer Computational Instructions</strong>: ADD, SUB, AND, OR, XOR, SLT, etc.</li>
          <li><strong>Control Transfer Instructions</strong>: JAL, JALR, BEQ, BNE, BLT, etc.</li>
          <li><strong>Load/Store Instructions</strong>: LW, LH, LB, SW, SH, SB (with signed and unsigned variants)</li>
          <li><strong>Environment Instructions</strong>: ECALL, EBREAK for system calls and breakpoints</li>
        </ul>

        <h4>RV64I: The 64-bit Base Integer ISA</h4>
        <p>RV64I extends RV32I to support 64-bit addressing and integer operations.</p>
        <ul>
          <li><strong>Register Set</strong>: 32 general-purpose 64-bit registers (x0-x31)</li>
          <li><strong>PC Width</strong>: 64-bit program counter</li>
          <li><strong>Memory Access</strong>: 64-bit address space</li>
          <li><strong>Additional Instructions</strong>: 64-bit variants of integer operations (ADDW, SUBW, etc.) and memory access (LWU, LD, SD)</li>
          <li><strong>Design Consistency</strong>: Maintains the same instruction formats and addressing principles as RV32I</li>
        </ul>

        <h4>RV128I: Looking to the Future</h4>
        <p>The RISC-V specification also defines RV128I as a future-looking 128-bit base integer ISA. While not yet commonly implemented, it provides a path for extreme memory requirements in future computing systems.</p>

        <h4>RV32E: The Embedded Variant</h4>
        <p>For extremely resource-constrained embedded systems, RV32E offers a reduced version of RV32I with only 16 registers (x0-x15) instead of 32. This can significantly reduce the silicon area and power consumption of very small cores.</p>

        <h3>Register File Conventions</h3>
        <p>The RISC-V register file follows specific naming conventions and usage patterns:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Register</th>
            <th>ABI Name</th>
            <th>Description</th>
            <th>Saver</th>
          </tr>
          <tr>
            <td>x0</td>
            <td>zero</td>
            <td>Hardwired zero</td>
            <td>-</td>
          </tr>
          <tr>
            <td>x1</td>
            <td>ra</td>
            <td>Return address</td>
            <td>Caller</td>
          </tr>
          <tr>
            <td>x2</td>
            <td>sp</td>
            <td>Stack pointer</td>
            <td>Callee</td>
          </tr>
          <tr>
            <td>x3</td>
            <td>gp</td>
            <td>Global pointer</td>
            <td>-</td>
          </tr>
          <tr>
            <td>x4</td>
            <td>tp</td>
            <td>Thread pointer</td>
            <td>-</td>
          </tr>
          <tr>
            <td>x5-x7</td>
            <td>t0-t2</td>
            <td>Temporaries</td>
            <td>Caller</td>
          </tr>
          <tr>
            <td>x8</td>
            <td>s0/fp</td>
            <td>Saved register/frame pointer</td>
            <td>Callee</td>
          </tr>
          <tr>
            <td>x9</td>
            <td>s1</td>
            <td>Saved register</td>
            <td>Callee</td>
          </tr>
          <tr>
            <td>x10-x11</td>
            <td>a0-a1</td>
            <td>Function arguments/return values</td>
            <td>Caller</td>
          </tr>
          <tr>
            <td>x12-x17</td>
            <td>a2-a7</td>
            <td>Function arguments</td>
            <td>Caller</td>
          </tr>
          <tr>
            <td>x18-x27</td>
            <td>s2-s11</td>
            <td>Saved registers</td>
            <td>Callee</td>
          </tr>
          <tr>
            <td>x28-x31</td>
            <td>t3-t6</td>
            <td>Temporaries</td>
            <td>Caller</td>
          </tr>
        </table>
      `
    },
    {
      id: "2.2",
      title: "Instruction Formats",
      content: `
        <h3>RISC-V Instruction Formats</h3>
        <p>RISC-V uses a small number of consistent instruction formats, all 32 bits wide in the base ISA. This regularity simplifies decoding and improves extensibility.</p>

        <h4>The Six Basic Instruction Formats</h4>
        <p>RISC-V instructions are organized into six formats (R, I, S, B, U, J), each designed for different instruction types while maintaining consistent bit positions for key fields:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://raw.githubusercontent.com/riscv/riscv-isa-manual/master/src/images/instr-formats.png" alt="RISC-V Instruction Formats" style="max-width: 700px; width: 100%;">
        </div>
        
        <p>Key aspects of the instruction formats:</p>
        <ul>
          <li><strong>Opcode Field</strong>: Always in the same position (bits 0-6) across all formats</li>
          <li><strong>Register Specifiers</strong>: Fixed positions for rs1, rs2, and rd across formats</li>
          <li><strong>Immediate Fields</strong>: Spread across different bit positions but designed for efficient sign extension</li>
        </ul>
        
        <h4>Format Details</h4>
        <ul>
          <li><strong>R-type</strong> (Register): Used for register-register operations like ADD, SUB, AND, OR.
            <ul>
              <li>Format: [funct7][rs2][rs1][funct3][rd][opcode]</li>
              <li>Example: ADD rd, rs1, rs2</li>
            </ul>
          </li>
          <li><strong>I-type</strong> (Immediate): Used for register-immediate operations and loads.
            <ul>
              <li>Format: [imm[11:0]][rs1][funct3][rd][opcode]</li>
              <li>Examples: ADDI rd, rs1, imm; LW rd, offset(rs1)</li>
            </ul>
          </li>
          <li><strong>S-type</strong> (Store): Used for store instructions.
            <ul>
              <li>Format: [imm[11:5]][rs2][rs1][funct3][imm[4:0]][opcode]</li>
              <li>Example: SW rs2, offset(rs1)</li>
            </ul>
          </li>
          <li><strong>B-type</strong> (Branch): Used for conditional branches.
            <ul>
              <li>Format: [imm[12|10:5]][rs2][rs1][funct3][imm[4:1|11]][opcode]</li>
              <li>Example: BEQ rs1, rs2, offset</li>
            </ul>
          </li>
          <li><strong>U-type</strong> (Upper Immediate): Used for instructions with upper immediate values.
            <ul>
              <li>Format: [imm[31:12]][rd][opcode]</li>
              <li>Examples: LUI rd, imm; AUIPC rd, imm</li>
            </ul>
          </li>
          <li><strong>J-type</strong> (Jump): Used for unconditional jumps.
            <ul>
              <li>Format: [imm[20|10:1|11|19:12]][rd][opcode]</li>
              <li>Example: JAL rd, offset</li>
            </ul>
          </li>
        </ul>
        
        <h4>Immediate Encoding Strategies</h4>
        <p>RISC-V employs clever immediate encoding strategies to maximize efficiency:</p>
        <ul>
          <li><strong>Sign Extension</strong>: The sign bit (most significant bit of immediate) is always in bit 31 of the instruction for easy sign extension</li>
          <li><strong>Branch and Jump Encoding</strong>: For B and J formats, immediates encode even byte offsets (implicitly multiplied by 2) to increase effective range</li>
          <li><strong>Instruction Alignment</strong>: All 32-bit instructions are 4-byte aligned, so the lowest 2 bits of any PC-relative offset are always zero (not encoded)</li>
        </ul>

        <p>These carefully designed formats ensure that RISC-V instructions are both easy to decode (fixed opcode position) and efficiently encoded (maximum utilization of available bits).</p>
      `
    }
  ],
  examples: [
    {
      id: "example2_1",
      title: "RISC-V Assembly Examples",
      description: "Basic RISC-V assembly code examples showing different instruction formats",
      code: `# R-type instruction example (register-register)
add  t0, t1, t2      # t0 = t1 + t2

# I-type instruction examples (register-immediate)
addi t0, t1, 10      # t0 = t1 + 10
lw   t0, 8(t1)       # t0 = Memory[t1 + 8], load word

# S-type instruction example (store)
sw   t0, 16(t1)      # Memory[t1 + 16] = t0, store word

# B-type instruction example (branch)
beq  t0, t1, label   # If t0 == t1, PC = label
bne  t0, zero, loop  # If t0 != 0, branch to loop

# U-type instruction examples
lui  t0, 0x12345     # t0 = 0x12345000 (load upper immediate)
auipc t0, 0x1000     # t0 = PC + 0x1000000 (add upper immediate to PC)

# J-type instruction example (jump)
jal  ra, function    # Jump to function, save return address in ra`,
      explanation: "These examples demonstrate the different instruction formats in RISC-V. Note how each follows the standard RISC-V assembly syntax. R-type instructions use three registers (destination and two sources). I-type combines a register with an immediate value. S-type stores a register value to memory. B-type performs conditional branches. U-type loads a 20-bit immediate into the upper 20 bits of a register. J-type jumps to a new address and optionally saves the return address."
    },
    {
      id: "example2_2",
      title: "Instruction Binary Encoding",
      description: "Example of how RISC-V instructions are encoded in binary",
      code: `Instruction: add x5, x6, x7
Format: R-type

Binary encoding:
0000000 00111 00110 000 00101 0110011
|       |     |     |   |     |
funct7  rs2   rs1   f3  rd    opcode
        (x7)  (x6)      (x5)  (R-type ALU)

Instruction: addi x5, x6, 20
Format: I-type

Binary encoding:
000000010100 00110 000 00101 0010011
|           |     |   |     |
imm[11:0]   rs1   f3  rd    opcode
(20)        (x6)      (x5)  (I-type ALU)

Instruction: sw x7, 8(x6)
Format: S-type

Binary encoding:
0000001 00111 00110 010 01000 0100011
|       |     |     |   |     |
imm[11:5] rs2   rs1   f3  imm[4:0] opcode
(8 high)  (x7)  (x6)      (8 low)  (store)`,
      explanation: "This example shows how RISC-V instructions are encoded in their binary format. Each instruction type has a specific layout of fields. The opcode always occupies the lowest 7 bits (bits 0-6). Register specifiers are consistently positioned, with rs1 in bits 15-19, rs2 in bits 20-24, and rd in bits 7-11. Immediate values are distributed across the instruction word differently depending on the format, but always arranged to facilitate efficient sign extension."
    }
  ],
  quiz: {
    title: "RISC-V Instruction Set Architecture Quiz",
    questions: [
      {
        question: "What is the width of the base RISC-V instructions?",
        options: [
          "16 bits",
          "32 bits",
          "64 bits",
          "Variable width"
        ],
        correctAnswer: 1,
        explanation: "Base RISC-V instructions (RV32I and RV64I) are always 32 bits wide. The 'C' extension adds 16-bit compressed instructions, but these are an optional extension to the base ISA."
      },
      {
        question: "How many general-purpose registers are there in the standard RISC-V integer ISA?",
        options: [
          "8 registers",
          "16 registers",
          "32 registers",
          "64 registers"
        ],
        correctAnswer: 2,
        explanation: "The standard RISC-V integer ISA (RV32I/RV64I) defines 32 general-purpose integer registers, named x0 through x31. The RV32E variant for embedded systems reduces this to 16 registers."
      },
      {
        question: "Which of the following is NOT a standard RISC-V instruction format?",
        options: [
          "R-type (Register)",
          "I-type (Immediate)",
          "M-type (Memory)",
          "U-type (Upper immediate)"
        ],
        correctAnswer: 2,
        explanation: "There is no M-type instruction format in RISC-V. The standard formats are R-type (register-register), I-type (immediate), S-type (store), B-type (branch), U-type (upper immediate), and J-type (jump)."
      },
      {
        question: "Which register is hardwired to zero in RISC-V?",
        options: [
          "x0",
          "x1",
          "x2",
          "x31"
        ],
        correctAnswer: 0,
        explanation: "Register x0 (also called 'zero' in the ABI naming convention) is hardwired to the value 0. Writing to this register has no effect, and reading from it always returns 0."
      },
      {
        question: "What does the 'G' in RV64G stand for?",
        options: [
          "Graphics extension",
          "General-purpose computing",
          "Government-approved specification",
          "Gigantic register file"
        ],
        correctAnswer: 1,
        explanation: "The 'G' in RV64G stands for 'General-purpose' and is shorthand for the combination of the base integer ISA (I) plus the M, A, F, and D extensions (IMAFD). It represents a complete general-purpose instruction set."
      }
    ]
  }
};

export default chapter2; 