const chapter1 = {
  id: 1,
  title: "Introduction to RISC-V Architecture",
  description: "Overview of RISC-V ISA and its impact on the processor industry",
  estimatedTime: "2 hours",
  completed: false,
  sections: [
    {
      id: "1.1",
      title: "History and Evolution of Computer Architecture",
      content: `
        <h3>The Evolution of Processor Architectures</h3>
        <p>Understanding the history of computer architecture provides essential context for appreciating RISC-V's significance in the industry.</p>
        
        <h4>Von Neumann vs. Harvard Architectures</h4>
        <p>The foundation of modern computing began with two fundamental architecture models:</p>
        <ul>
          <li><strong>Von Neumann Architecture</strong>: Uses a shared memory space for both instructions and data. This architecture, proposed by John von Neumann in 1945, forms the basis for most general-purpose computers today. Its simplicity comes with the cost of the "von Neumann bottleneck" where instruction fetching and data access compete for memory bandwidth.</li>
          <li><strong>Harvard Architecture</strong>: Features physically separate storage and signal pathways for instructions and data. Originally implemented in the Harvard Mark I computer, this design enables simultaneous access to instruction and data memories, potentially increasing performance at the cost of additional hardware complexity. Many modern microcontrollers and DSPs use modified Harvard architectures to gain performance benefits.</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Von_Neumann_Architecture.svg/1920px-Von_Neumann_Architecture.svg.png" alt="Von Neumann Architecture" style="max-width: 500px; width: 100%;">
          <p><em>Von Neumann Architecture with shared memory for instructions and data</em></p>
        </div>
        
        <h4>CISC vs. RISC Design Philosophies</h4>
        <p>The 1970s and 1980s saw the emergence of two competing processor design philosophies:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Characteristic</th>
            <th>CISC (Complex Instruction Set Computer)</th>
            <th>RISC (Reduced Instruction Set Computer)</th>
          </tr>
          <tr>
            <td><strong>Instruction Complexity</strong></td>
            <td>Many complex, multi-cycle instructions</td>
            <td>Few simple, single-cycle instructions</td>
          </tr>
          <tr>
            <td><strong>Instruction Length</strong></td>
            <td>Variable-length instructions</td>
            <td>Fixed-length instructions</td>
          </tr>
          <tr>
            <td><strong>Memory Access</strong></td>
            <td>Multiple memory-addressing modes</td>
            <td>Load-store architecture (memory access only through specific instructions)</td>
          </tr>
          <tr>
            <td><strong>Register Usage</strong></td>
            <td>Fewer registers</td>
            <td>More registers</td>
          </tr>
          <tr>
            <td><strong>Execution Model</strong></td>
            <td>Microcode often used to implement complex instructions</td>
            <td>Hardwired control, direct execution</td>
          </tr>
          <tr>
            <td><strong>Examples</strong></td>
            <td>x86, x86-64, 68000</td>
            <td>MIPS, ARM, SPARC, RISC-V</td>
          </tr>
        </table>
        
        <p>The RISC philosophy emerged from research at IBM (John Cocke), Stanford (MIPS), and Berkeley (RISC) in the late 1970s and early 1980s. It was based on the observation that most complex instructions in CISC processors were rarely used by compilers, and a simpler instruction set could lead to faster execution with proper compiler optimization.</p>
        
        <h4>Historical RISC Architectures</h4>
        <p>Several RISC architectures have significantly influenced the computing landscape:</p>
        <ul>
          <li><strong>MIPS</strong>: Developed at Stanford University in the early 1980s by John Hennessy and his team. MIPS became widely used in embedded systems, game consoles (PlayStation), and was influential in computer architecture education.</li>
          <li><strong>ARM</strong>: Developed by Acorn Computers in the 1980s. The ARM architecture has become dominant in mobile devices and embedded systems due to its power efficiency. Today, ARM-based processors power billions of devices worldwide.</li>
          <li><strong>SPARC</strong>: Developed by Sun Microsystems in the late 1980s. SPARC processors were widely used in Sun's workstations and servers, known for their scalability and performance in enterprise environments.</li>
          <li><strong>PowerPC</strong>: Developed by the Apple-IBM-Motorola alliance in the early 1990s. PowerPC processors were used in Apple Macintosh computers until 2006 and continue to be used in embedded systems and high-performance computing.</li>
        </ul>
        
        <h4>Birth of RISC-V at UC Berkeley</h4>
        <p>RISC-V emerged in 2010 at the University of California, Berkeley, under the leadership of Krste Asanović, David Patterson, and their team. Unlike previous RISC architectures, RISC-V was designed from the start to be:</p>
        <ul>
          <li><strong>Free and Open</strong>: No licensing fees or legal restrictions</li>
          <li><strong>Modular</strong>: A small base ISA with optional standard extensions</li>
          <li><strong>Stable</strong>: Base instructions won't change, ensuring software compatibility</li>
          <li><strong>Extensible</strong>: Custom extensions can be added for specialized applications</li>
          <li><strong>Practical</strong>: Designed based on lessons learned from decades of RISC architecture development</li>
        </ul>
        
        <p>What began as an academic project has grown into a global open standard managed by RISC-V International, with hundreds of member organizations contributing to its development and adoption.</p>
      `
    },
    {
      id: "1.2",
      title: "The RISC-V Ecosystem",
      content: `
        <h3>The Growing RISC-V Community and Infrastructure</h3>
        
        <h4>RISC-V International Governance</h4>
        <p>RISC-V International, established in 2015 (originally as the RISC-V Foundation), serves as the steward of the RISC-V ISA standard. Key aspects of its governance include:</p>
        <ul>
          <li><strong>Member-driven Organization</strong>: Over 3,000 members (as of 2023) from academia and industry collaborate on the specification's development.</li>
          <li><strong>Technical Working Groups</strong>: Specialized committees develop and refine various aspects of the ISA and its extensions.</li>
          <li><strong>Ratification Process</strong>: Ensures stability through careful vetting of proposed changes and extensions.</li>
          <li><strong>Open Specifications</strong>: The ISA specifications are freely available and openly licensed.</li>
          <li><strong>Compatibility Testing</strong>: Developing test suites to ensure RISC-V implementations comply with the specification.</li>
        </ul>
        
        <h4>Open-Source RISC-V Implementations</h4>
        <p>Numerous open-source implementations of RISC-V cores are available, serving different needs from education to high-performance computing:</p>
        <ul>
          <li><strong>Rocket</strong>: The original 64-bit RISC-V core from UC Berkeley, implemented in Chisel HDL. It supports the RV64GC instruction set and includes an optional L1 cache system.</li>
          <li><strong>BOOM (Berkeley Out-of-Order Machine)</strong>: A superscalar, out-of-order RISC-V core that pushes the performance envelope for open-source processors. Also implemented in Chisel.</li>
          <li><strong>CVA6/Ariane</strong>: A 64-bit application-class core developed by ETH Zurich, implemented in SystemVerilog. It features a 6-stage pipeline and support for the RV64GC instruction set.</li>
          <li><strong>Piccolo</strong>: A compact, in-order, 32-bit RISC-V core suitable for embedded applications, developed by Bluespec.</li>
          <li><strong>Western Digital SweRV Cores</strong>: A family of commercial-grade cores with various performance points, open-sourced by Western Digital.</li>
          <li><strong>PicoRV32</strong>: A compact RV32I implementation designed for FPGA targets.</li>
          <li><strong>VexRiscv</strong>: A flexible RISC-V implementation written in SpinalHDL, configurable for different performance/area trade-offs.</li>
        </ul>
        
        <h4>Commercial RISC-V Vendors</h4>
        <p>Many companies now offer commercial RISC-V IP and solutions:</p>
        <ul>
          <li><strong>SiFive</strong>: Founded by the creators of RISC-V, SiFive offers processor IP cores ranging from embedded controllers to high-performance application processors.</li>
          <li><strong>Andes Technology</strong>: Provides highly efficient RISC-V processor cores for various applications, with particular strength in the IoT and embedded markets.</li>
          <li><strong>Codasip</strong>: Offers both off-the-shelf RISC-V cores and custom processor design services based on their processor design automation technology.</li>
          <li><strong>Esperanto Technologies</strong>: Develops high-performance, energy-efficient RISC-V processors for AI and machine learning applications.</li>
          <li><strong>CloudBEAR</strong>: Specializes in secure, efficient RISC-V cores for embedded applications.</li>
          <li><strong>Nuclei System Technology</strong>: China-based provider of RISC-V processor IP and solutions.</li>
        </ul>
        
        <h4>Development Boards and Silicon Availability</h4>
        <p>Hardware platforms available for RISC-V development continue to expand:</p>
        <ul>
          <li><strong>HiFive Boards (SiFive)</strong>: Range from the entry-level HiFive1 (FE310) to the powerful HiFive Unmatched (U74).</li>
          <li><strong>PolarFire SoC (Microchip)</strong>: Combines RISC-V processors with FPGA fabric in a low-power platform.</li>
          <li><strong>VisionFive (StarFive)</strong>: Linux-capable RISC-V single-board computer with multimedia capabilities.</li>
          <li><strong>Allwinner D1/Nezha</strong>: Features a single-core RISC-V processor for Linux applications.</li>
          <li><strong>GreenWaves GAP8/9</strong>: Multi-core RISC-V processors optimized for AI at the edge.</li>
          <li><strong>Kendryte K210</strong>: Dual-core RISC-V processor with AI accelerators, available on affordable development boards.</li>
          <li><strong>ESP32-C3 (Espressif)</strong>: WiFi/BLE SoC with a RISC-V core, compatible with the popular ESP32 ecosystem.</li>
        </ul>
        
        <h4>Major Industry Adopters</h4>
        <p>RISC-V has gained significant traction with major technology companies:</p>
        <ul>
          <li><strong>Western Digital</strong>: Committed to shipping over two billion RISC-V cores annually in their storage products.</li>
          <li><strong>NVIDIA</strong>: Uses RISC-V cores as management processors in their GPUs and for their Falcon security processor.</li>
          <li><strong>Alibaba</strong>: Developed their Xuantie series of RISC-V processors for cloud and edge computing.</li>
          <li><strong>Microchip</strong>: Integrated RISC-V cores in their PolarFire SoC FPGA platform.</li>
          <li><strong>Qualcomm</strong>: Exploring RISC-V for specific applications within their product ecosystem.</li>
          <li><strong>Seagate</strong>: Adopting RISC-V for controller applications in storage devices.</li>
          <li><strong>Google</strong>: Contributing to RISC-V development and exploring its use in various applications.</li>
          <li><strong>Intel</strong>: Supporting RISC-V through their foundry services and FPGA integration.</li>
        </ul>
        
        <p>The rapidly growing ecosystem demonstrates RISC-V's transition from an academic project to a commercially viable and increasingly mainstream ISA alternative.</p>
      `
    },
    {
      id: "1.3",
      title: "ISA Benefits and Business Case",
      content: `
        <h3>The Value Proposition of RISC-V</h3>
        
        <h4>Hardware-Software Interface Stability</h4>
        <p>One of RISC-V's key strengths is its commitment to long-term stability:</p>
        <ul>
          <li><strong>Base ISA Freeze</strong>: The fundamental base instructions (RV32I, RV64I) are frozen and will not change, ensuring that software written today will continue to work on future RISC-V implementations.</li>
          <li><strong>Standardized Extensions</strong>: Extensions like M (multiply/divide), A (atomic), F/D (floating-point) undergo rigorous review before ratification to ensure forward compatibility.</li>
          <li><strong>Clear Versioning</strong>: Each extension is versioned, making compatibility requirements explicit.</li>
          <li><strong>Separation of Concerns</strong>: Privileged architecture (operating system interface) is separated from the base ISA, allowing independent evolution as needed.</li>
        </ul>
        
        <p>This stability creates a reliable hardware-software interface that reduces maintenance costs and extends software lifetimes.</p>
        
        <h4>Customization without Fragmentation</h4>
        <p>RISC-V uniquely enables customization while maintaining ecosystem compatibility:</p>
        <ul>
          <li><strong>Reserved Opcode Space</strong>: Dedicated opcode regions for standard extensions, custom extensions, and vendor-specific extensions.</li>
          <li><strong>Discovery Mechanism</strong>: Software can query a processor's capabilities to determine available extensions.</li>
          <li><strong>Modularity</strong>: Implementations can select which standard extensions to include based on application needs.</li>
          <li><strong>Custom Extensions</strong>: Organizations can add application-specific instructions while maintaining compatibility with the base ISA.</li>
          <li><strong>Standardization Path</strong>: Popular custom extensions can be proposed for standardization, benefiting the entire ecosystem.</li>
        </ul>
        
        <p>This approach allows companies to innovate while preserving software compatibility and ecosystem benefits.</p>
        
        <h4>Vendor Independence and Supply Chain Resilience</h4>
        <p>The open nature of RISC-V creates significant advantages for supply chain management:</p>
        <ul>
          <li><strong>Multiple Suppliers</strong>: Companies can source RISC-V cores from different vendors while maintaining software compatibility.</li>
          <li><strong>No Lock-in</strong>: The absence of licensing fees and restrictive terms prevents vendor lock-in.</li>
          <li><strong>Geographical Diversity</strong>: RISC-V vendors exist across multiple countries and regions, reducing geopolitical supply risks.</li>
          <li><strong>In-house Options</strong>: Organizations can develop their own RISC-V implementations if needed, providing ultimate control.</li>
          <li><strong>Second Sourcing</strong>: Critical systems can have backup suppliers without major software changes.</li>
        </ul>
        
        <p>These benefits have become increasingly important in an era of geopolitical tensions, supply chain disruptions, and strategic technology independence.</p>
        
        <h4>Total Cost of Ownership Analysis</h4>
        <p>When evaluating RISC-V against proprietary alternatives, companies consider various cost factors:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Cost Category</th>
            <th>Proprietary ISA</th>
            <th>RISC-V</th>
          </tr>
          <tr>
            <td><strong>Licensing Costs</strong></td>
            <td>Upfront license fees plus royalties per chip</td>
            <td>No licensing fees or royalties</td>
          </tr>
          <tr>
            <td><strong>Implementation Costs</strong></td>
            <td>Usually lower initially (pre-built IP)</td>
            <td>Variable (can use open-source cores or commercial IP)</td>
          </tr>
          <tr>
            <td><strong>Customization Costs</strong></td>
            <td>Often high, may require vendor cooperation</td>
            <td>Built into the architecture, more accessible</td>
          </tr>
          <tr>
            <td><strong>Software Ecosystem</strong></td>
            <td>More mature in some segments</td>
            <td>Growing rapidly, with substantial industry investment</td>
          </tr>
          <tr>
            <td><strong>Long-term Support</strong></td>
            <td>Dependent on vendor business decisions</td>
            <td>Community-supported, vendor-independent</td>
          </tr>
          <tr>
            <td><strong>Risk Management</strong></td>
            <td>Vendor lock-in, potential for end-of-life</td>
            <td>Multiple vendors, open specification ensures longevity</td>
          </tr>
        </table>
        
        <p>While the initial implementation costs might sometimes be higher, the long-term TCO advantages of RISC-V are becoming increasingly compelling as the ecosystem matures.</p>
        
        <h4>Embedded to HPC Scalability</h4>
        <p>RISC-V's scalability across different performance domains is a key technical advantage:</p>
        <ul>
          <li><strong>Embedded/IoT</strong>: Minimal RV32E cores can be implemented in less than 10,000 gates, suitable for ultra-low-power applications.</li>
          <li><strong>Microcontrollers</strong>: RV32I/RV32IM implementations compete effectively with Arm Cortex-M class devices.</li>
          <li><strong>Application Processors</strong>: RV64GC implementations with modern microarchitectural features deliver performance comparable to mainstream application processors.</li>
          <li><strong>Server/HPC</strong>: Implementations like SiFive's Intelligence X280 and the European Processor Initiative's RISC-V accelerator showcase the architecture's high-performance capabilities.</li>
          <li><strong>Vector Processing</strong>: The "V" extension enables efficient vectorized computation for HPC and AI workloads.</li>
        </ul>
        
        <p>This scalability enables companies to leverage consistent architecture, tools, and software across their entire product range, from tiny sensors to high-performance computing applications.</p>
      `
    },
    {
      id: "1.4",
      title: "Key Takeaways",
      content: `
        <h3>Summary: Understanding RISC-V's Position in the Processor Landscape</h3>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Key Points</h4>
          <ul>
            <li>RISC-V builds on decades of RISC architecture development, addressing limitations of previous ISAs.</li>
            <li>The open, modular nature of RISC-V enables customization without fragmentation, providing flexibility without sacrificing compatibility.</li>
            <li>A robust ecosystem of both open-source and commercial implementations is developing rapidly, with major industry adopters validating the approach.</li>
            <li>RISC-V offers compelling business advantages: no licensing fees, vendor independence, supply chain resilience, and long-term stability.</li>
            <li>The architecture scales from tiny embedded systems to high-performance computing, allowing consistent tools and software across product ranges.</li>
          </ul>
        </div>
        
        <h3>What's Next?</h3>
        <p>Now that you understand the context and value proposition of RISC-V, we're ready to dive into the technical details of the RISC-V Instruction Set Architecture. In the next chapter, we'll explore the RISC-V ISA fundamentals, including its base integer instructions, standard extensions, and privilege levels.</p>
        
        <h3>Reflection Questions</h3>
        <ol>
          <li>How might RISC-V's open nature impact innovation in specialized domains like AI, IoT, or security?</li>
          <li>What advantages does a modular ISA approach offer for different application domains compared to a one-size-fits-all approach?</li>
          <li>Consider a product with a 10+ year lifecycle—how might RISC-V's characteristics benefit such long-lifecycle designs?</li>
          <li>How might an open ISA like RISC-V affect the processor industry's business models and competitive landscape?</li>
        </ol>
      `
    }
  ],
  examples: [
    {
      id: "example1_1",
      title: "RISC-V vs. Other ISAs Comparison",
      description: "A comparison of key characteristics between RISC-V and other common ISAs",
      code: `ISA Comparison Table

RISC-V (RV32G)  | ARM (ARMv8-A)      | x86-64
--------------- | ------------------ | ------------------
Open standard    | Proprietary        | Proprietary
Modular ISA      | Multiple profiles  | Monolithic
32 registers     | 31 registers       | 16 registers
Fixed-width instr| Mixed-width instr  | Variable-width instr
Few addr. modes  | Multiple addr. modes| Many addr. modes
Clean design     | CISC/RISC hybrid   | CISC with RISC core
Recent (2010+)   | Evolved since 1985 | Evolved since 1978
Load-Store arch  | Load-Store arch    | Register-memory arch`,
      explanation: "This comparison highlights key architectural differences between RISC-V and established ISAs like ARM and x86. RISC-V maintains pure RISC principles with fixed-width instructions, numerous registers, and a load-store architecture. Unlike proprietary ISAs, RISC-V is an open standard that anyone can implement without licensing fees. Its modular approach allows implementers to include only the extensions needed for their application, optimizing area and power efficiency."
    },
    {
      id: "example1_2",
      title: "RISC-V Base and Extensions",
      description: "Showcasing the modular nature of RISC-V with base ISA and extensions",
      code: `RISC-V Modularity

Base ISA (Required)
- RV32I: 32-bit base integer instructions
- RV64I: 64-bit base integer instructions

Standard Extensions (Optional)
- M: Integer Multiplication and Division
- A: Atomic Instructions
- F: Single-precision Floating-point
- D: Double-precision Floating-point
- C: Compressed Instructions (16-bit)
- V: Vector Operations
- B: Bit Manipulation

Common Combinations
- RV32E: Embedded variant (16 registers)
- RV32IM: Base + Multiplication
- RV64GC: G(=IMAFD) + Compressed
- RV32IMC: Common for microcontrollers`,
      explanation: "This example illustrates RISC-V's modular approach to ISA design. Implementations start with a base integer ISA (RV32I or RV64I) and can add standardized extensions based on application needs. This modularity allows for optimized designs across the full spectrum from tiny embedded controllers to high-performance processors. The 'G' designation (General-purpose) is a shorthand for the IMAFD combination commonly used in application processors."
    }
  ],
  quiz: {
    title: "Introduction to RISC-V Architecture Quiz",
    questions: [
      {
        question: "What fundamental characteristic distinguishes RISC-V from proprietary ISAs like ARM and x86?",
        options: [
          "It uses a Harvard architecture instead of von Neumann",
          "It is an open standard with no licensing fees",
          "It can only be implemented on FPGAs",
          "It supports only 32-bit computing"
        ],
        correctAnswer: 1,
        explanation: "RISC-V's defining characteristic is that it's an open standard ISA that can be implemented by anyone without licensing fees or royalties. This distinguishes it from proprietary architectures like ARM and x86 that require licensing agreements."
      },
      {
        question: "What does the 'V' in RISC-V stand for?",
        options: [
          "Virtual - indicating support for virtualization",
          "Version - as it's the fifth major RISC architecture",
          "Vector - referring to its vector processing capabilities",
          "Versatile - highlighting its adaptability"
        ],
        correctAnswer: 1,
        explanation: "The 'V' in RISC-V stands for 'Version 5' as it's the fifth generation of RISC architectures developed at UC Berkeley, following earlier RISC designs."
      },
      {
        question: "Which of the following best describes RISC-V's approach to ISA design?",
        options: [
          "One comprehensive ISA that includes all possible instructions",
          "A small mandatory base ISA with optional standardized extensions",
          "Multiple completely separate ISAs for different application domains",
          "A dynamically reconfigurable instruction set"
        ],
        correctAnswer: 1,
        explanation: "RISC-V employs a modular approach with a small, stable base ISA (like RV32I or RV64I) and optional standardized extensions (like M for multiply/divide, F for floating-point, etc.) that can be included based on application requirements."
      },
      {
        question: "What year was RISC-V initially developed at UC Berkeley?",
        options: [
          "2000",
          "2005",
          "2010",
          "2015"
        ],
        correctAnswer: 2,
        explanation: "RISC-V was initially developed at UC Berkeley in 2010 under the leadership of Krste Asanović and David Patterson."
      },
      {
        question: "Which of the following is NOT a standard extension in the RISC-V ISA?",
        options: [
          "M - Integer Multiplication and Division",
          "P - Packed SIMD Instructions",
          "X - External Memory Interface",
          "C - Compressed Instructions"
        ],
        correctAnswer: 2,
        explanation: "There is no standard 'X' extension for External Memory Interface in RISC-V. The letter 'X' is actually reserved for custom (non-standard) extensions. The other options are valid standard extensions: M (multiply/divide), P (packed SIMD, though still in development), and C (compressed instructions)."
      },
      {
        question: "What is a key supply chain advantage of RISC-V's open model?",
        options: [
          "RISC-V processors are always cheaper to manufacture",
          "RISC-V designs can be implemented by multiple vendors, reducing vendor lock-in",
          "RISC-V processors require fewer semiconductor materials",
          "RISC-V processors can only be manufactured in advanced fabrication facilities"
        ],
        correctAnswer: 1,
        explanation: "A key supply chain advantage of RISC-V is that its open nature allows multiple vendors to implement compatible processors, reducing vendor lock-in and providing alternative sources if one supplier has issues."
      },
      {
        question: "Which RISC-V characteristic is most important for long-lifecycle embedded products?",
        options: [
          "The ability to add new instructions as technology advances",
          "The guarantee that the base ISA will remain stable and backward compatible",
          "The option to use non-standard coding techniques",
          "The requirement for specialized development tools"
        ],
        correctAnswer: 1,
        explanation: "For long-lifecycle embedded products, RISC-V's guarantee of base ISA stability is crucial. This ensures that software written today will continue to function on future implementations, even decades later, without requiring rewrites."
      },
      {
        question: "What distinguishes the Harvard architecture from the von Neumann architecture?",
        options: [
          "Harvard uses semiconductor memory while von Neumann uses magnetic storage",
          "Harvard was developed in the US while von Neumann was developed in Europe",
          "Harvard has physically separate memory spaces for instructions and data",
          "Harvard supports multitasking while von Neumann is single-threaded"
        ],
        correctAnswer: 2,
        explanation: "The key distinguishing feature of Harvard architecture is that it uses physically separate memory spaces and pathways for instructions and data, allowing simultaneous access to both. Von Neumann architecture, in contrast, uses a single memory space for both."
      },
      {
        question: "Which organization serves as the steward of the RISC-V ISA specifications?",
        options: [
          "UC Berkeley Computer Science Department",
          "RISC-V International",
          "The Linux Foundation",
          "World Wide Web Consortium (W3C)"
        ],
        correctAnswer: 1,
        explanation: "RISC-V International (formerly the RISC-V Foundation) is the non-profit organization that maintains the RISC-V specifications, manages the development process for extensions, and promotes RISC-V adoption worldwide."
      },
      {
        question: "What characteristic of RISC processors generally distinguishes them from CISC processors?",
        options: [
          "RISC processors always operate at higher clock frequencies",
          "RISC processors have more complex addressing modes",
          "RISC processors use fixed-length instructions and load-store architecture",
          "RISC processors consume less power in all implementations"
        ],
        correctAnswer: 2,
        explanation: "A defining characteristic of RISC processors is their use of fixed-length instructions and a load-store architecture (where only specific load/store instructions access memory). This simplifies decoding and enables pipelined execution, while CISC processors typically use variable-length instructions with more complex addressing modes."
      }
    ]
  }
};

export default chapter1; 