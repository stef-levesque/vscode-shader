import { ParameterInformation } from 'vscode';

export class IEntry { 
    description?: string;
    parameters?: ParameterInformation[];
    link?: string;
 }

 //TODO: support multiple entry per name
export interface IEntries { [name: string]: IEntry; }

// From https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-intrinsic-functions

export var intrinsicfunctions: IEntries = {
    abort: {
        description: 'Submits an error message to the information queue and terminates the current draw or dispatch call being executed.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/abort'
    },
    abs: {
        description: 'Returns the absolute value of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-abs'
    },
    acos: {
        description: 'Returns the arccosine of the specified value.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value. Each component should be a floating-point value within the range of -1 to 1.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-acos'
    },
    all: {
        description: 'Determines if all components of the specified value are non-zero.',
        parameters: [{ label: 'value', documentation: 'The specified value' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-all'
    },
    AllMemoryBarrier: {
        description: 'Blocks execution of all threads in a group until all memory accesses have been completed.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/allmemorybarrier'
    },
    AllMemoryBarrierWithGroupSync: {
        description: 'Blocks execution of all threads in a group until all memory accesses have been completed and all threads in the group have reached this call.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/allmemorybarrierwithgroupsync'
    },
    any: {
        description: 'Determines if any components of the specified value are non-zero.',
        parameters: [{ label: 'value', documentation: 'The specified value' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-any'
    },
    asdouble: {
        description: 'Reinterprets a cast value (two 32-bit values) into a double.',
        parameters: [
            {
                label: 'lowbits',
                documentation: 'The low 32-bit pattern of the input value.'
            },
            {
                label: 'highbits',
                documentation: 'The high 32-bit pattern of the input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/asdouble'
    },
    asfloat: {
        description: 'Interprets the bit pattern of the input value as a floating-point number.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-asfloat'
    },
    asin: {
        description: 'Returns the arcsine of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-asin'
    },
    asint: {
        description: 'Interprets the bit pattern of the input value as an integer.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/asint'
    },
    asuint: {
        description: 'Reinterprets the bit pattern of a 64-bit value as two unsigned 32-bit integers.',
        parameters: [
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'lowbits',
                documentation: 'The low 32-bit pattern of the input value.'
            },
            {
                label: 'highbits',
                documentation: 'The high 32-bit pattern of the input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/asuint'
    },
    atan: {
        description: 'Returns the arctangent of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-atan'
    },
    atan2: {
        description: 'Returns the arctangent of two values (x,y).',
        parameters: [
            { label: 'y', documentation: 'The y value.' },
            { label: 'x', documentation: 'The x value.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-atan2'
    },
    ceil: {
        description: 'Returns the smallest integer value that is greater than or equal to the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-ceil'
    },
    CheckAccessFullyMapped: {
        description: 'Determines whether all values from a Sample, Gather, or Load operation accessed mapped tiles in a tiled resource.',
        parameters: [
            {
                label: 'status',
                documentation: "The status value that is returned from a Sample, Gather, or Load operation. Because you can't access this status value directly, you need to pass it to CheckAccessFullyMapped."
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/checkaccessfullymapped'
    },
    clamp: {
        description: 'Clamps the specified value to the specified minimum and maximum range.',
        parameters: [
            { label: 'value', documentation: 'A value to clamp.' },
            { label: 'min', documentation: 'The specified minimum range.' },
            { label: 'max', documentation: 'The specified maximum range.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-clamp'
    },
    clip: {
        description: 'Discards the current pixel if the specified value is less than zero.',
        parameters: [{ label: 'value', documentation: 'The specified value' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-clip'
    },
    cos: {
        description: 'Returns the cosine of the specified value.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value, in radians.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-cos'
    },
    cosh: {
        description: 'Returns the hyperbolic cosine of the specified value.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value, in radians.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-cosh'
    },
    countbits: {
        description: 'Counts the number of bits (per component) in the input integer.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/countbits'
    },
    cross: {
        description: 'Returns the cross product of two floating-point, 3D vectors.',
        parameters: [
            {
                label: 'x',
                documentation: 'The first floating-point, 3D vector.'
            },
            {
                label: 'y',
                documentation: 'The second floating-point, 3D vector.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-cross'
    },
    D3DCOLORtoUBYTE4: {
        description: 'Converts a floating-point, 4D vector set by a D3DCOLOR to a UBYTE4.',
        parameters: [
            {
                label: 'value',
                documentation: 'The floating-point vector4 to convert.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-d3dcolortoubyte4'
    },
    ddx: {
        description: 'Returns the partial derivative of the specified value with respect to the screen-space x-coordinate.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-ddx'
    },
    ddx_coarse: {
        description: 'Computes a low precision partial derivative with respect to the screen-space x-coordinate.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/ddx-coarse'
    },
    ddx_fine: {
        description: 'Computes a high precision partial derivative with respect to the screen-space x-coordinate.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/ddx-fine'
    },
    ddy: {
        description: 'Returns the partial derivative of the specified value with respect to the screen-space y-coordinate.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-ddy'
    },
    ddy_coarse: {
        description: 'Computes a low precision partial derivative with respect to the screen-space y-coordinate.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/ddy-coarse'
    },
    ddy_fine: {
        description: 'Computes a high precision partial derivative with respect to the screen-space y-coordinate.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/ddy-fine'
    },
    degrees: {
        description: 'Converts the specified value from radians to degrees.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-degrees'
    },
    determinant: {
        description: 'Returns the determinant of the specified floating-point, square matrix.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-determinant'
    },
    DeviceMemoryBarrier: {
        description: 'Blocks execution of all threads in a group until all device memory accesses have been completed.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/devicememorybarrier'
    },
    DeviceMemoryBarrierWithGroupSync: {
        description: 'Blocks execution of all threads in a group until all device memory accesses have been completed and all threads in the group have reached this call.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/devicememorybarrierwithgroupsync'
    },
    distance: {
        description: 'Returns a distance scalar between two vectors.',
        parameters: [
            {
                label: 'x',
                documentation: 'The first floating-point vector to compare.'
            },
            {
                label: 'y',
                documentation: 'The second floating-point vector to compare.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-distance'
    },
    dot: {
        description: 'Returns the dot product of two vectors.',
        parameters: [
            { label: 'x', documentation: 'The first vector.' },
            { label: 'y', documentation: 'The second vector.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-dot'
    },
    dst: {
        description: 'Calculates a distance vector.',
        parameters: [
            { label: 'x', documentation: 'The first vector.' },
            { label: 'y', documentation: 'The second vector.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dst'
    },
    errorf: {
        description: 'Submits an error message to the information queue.',
        parameters: [
            { label: 'format', documentation: 'The format string.' },
            { label: 'argument ...', documentation: 'Optional arguments.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/errorf'
    },
    EvaluateAttributeAtCentroid: {
        description: 'Evaluates at the pixel centroid.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/evaluateattributeatcentroid'
    },
    EvaluateAttributeAtSample: {
        description: 'Evaluates at the indexed sample location.',
        parameters: [
            { label: 'value', documentation: 'The input value.' },
            { label: 'sampleIndex', documentation: 'The sample location.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/evaluateattributeatsample'
    },
    EvaluateAttributeSnapped: {
        description: 'Evaluates at the pixel centroid with an offset.',
        parameters: [
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'offset',
                documentation: 'A 2D offset from the pixel center using a 16x16 grid.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/evaluateattributesnapped'
    },
    exp: {
        description: 'Returns the base-e exponential, or e^x, of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-exp'
    },
    exp2: {
        description: 'Returns the base 2 exponential, or 2^x, of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-exp2'
    },
    f16tof32: {
        description: 'Converts the float16 stored in the low-half of the uint to a float.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/f16tof32'
    },
    f32tof16: {
        description: 'Converts an input into a float16 type.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/f32tof16'
    },
    faceforward: {
        description: 'Flips the surface-normal (if needed) to face in a direction opposite to i; returns the result in n.',
        parameters: [
            {
                label: 'n',
                documentation: 'The resulting floating-point surface-normal vector.'
            },
            {
                label: 'i',
                documentation: 'A floating-point, incident vector that points from the view position to the shading position.'
            },
            {
                label: 'ng',
                documentation: 'A floating-point surface-normal vector.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-faceforward'
    },
    firstbithigh: {
        description: 'Gets the location of the first set bit starting from the highest order bit and working downward, per component.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/firstbithigh'
    },
    firstbitlow: {
        description: 'Returns the location of the first set bit starting from the lowest order bit and working upward, per component.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/firstbitlow'
    },
    floor: {
        description: 'Returns the largest integer that is less than or equal to the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-floor'
    },
    fma: {
        description: 'Returns the double-precision fused multiply-addition of a * b + c.',
        parameters: [
            {
                label: 'a',
                documentation: 'The first value in the fused multiply-addition.'
            },
            {
                label: 'b',
                documentation: 'The second value in the fused multiply-addition.'
            },
            {
                label: 'c',
                documentation: 'The third value in the fused multiply-addition.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-fma'
    },
    fmod: {
        description: 'Returns the floating-point remainder of x/y.',
        parameters: [
            { label: 'x', documentation: 'The floating-point dividend.' },
            { label: 'y', documentation: 'The floating-point divisor.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-fmod'
    },
    frac: {
        description: 'Returns the fractional (or decimal) part of x; which is greater than or equal to 0 and less than 1.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-frac'
    },
    frexp: {
        description: 'Returns the mantissa and exponent of the specified floating-point value.',
        parameters: [
            {
                label: 'x',
                documentation: 'The specified floating-point value. If the x parameter is 0, this function returns 0 for both the mantissa and the exponent.'
            },
            {
                label: 'exp',
                documentation: 'The returned exponent of the x parameter.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-frexp'
    },
    fwidth: {
        description: 'Returns the absolute value of the partial derivatives of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-fwidth'
    },
    GetRenderTargetSampleCount: {
        description: 'Gets the number of samples for a render target.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-getrendertargetsamplecount'
    },
    GetRenderTargetSamplePosition: {
        description: 'Gets the sampling position (x,y) for a given sample index.',
        parameters: [
            { label: 'index', documentation: 'A zero-based sample index.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-getrendertargetsampleposition'
    },
    GroupMemoryBarrier: {
        description: 'Blocks execution of all threads in a group until all group shared accesses have been completed.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/groupmemorybarrier'
    },
    GroupMemoryBarrierWithGroupSync: {
        description: 'Blocks execution of all threads in a group until all group shared accesses have been completed and all threads in the group have reached this call.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/groupmemorybarrierwithgroupsync'
    },
    InterlockedAdd: {
        description: 'Performs a guaranteed atomic add of value to the dest resource variable.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'Optional. The original input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedadd'
    },
    InterlockedAnd: {
        description: 'Performs a guaranteed atomic and.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'Optional. The original input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedand'
    },
    InterlockedCompareExchange: {
        description: "Atomically compares the destination with the comparison value. If they are identical, the destination is overwritten with the input value. The original value is set to the destination's original value.",
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            {
                label: 'compareValue',
                documentation: 'The comparison value.'
            },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'The original value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedcompareexchange'
    },
    InterlockedCompareStore: {
        description: 'Atomically compares the destination to the comparison value. If they are identical, the destination is overwritten with the input value.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            {
                label: 'compareValue',
                documentation: 'The comparison value.'
            },
            { label: 'value', documentation: 'The input value.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedcomparestore'
    },
    InterlockedExchange: {
        description: 'Assigns value to dest and returns the original value.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'The original input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedexchange'
    },
    InterlockedMax: {
        description: 'Performs a guaranteed atomic max.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'Optional. The original input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedmax'
    },
    InterlockedMin: {
        description: 'Performs a guaranteed atomic min.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'Optional. The original input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedmin'
    },
    InterlockedOr: {
        description: 'Performs a guaranteed atomic or.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'Optional. The original input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedor'
    },
    InterlockedXor: {
        description: 'Performs a guaranteed atomic xor.',
        parameters: [
            { label: 'dest', documentation: 'The destination address.' },
            { label: 'value', documentation: 'The input value.' },
            {
                label: 'originalValue',
                documentation: 'Optional. The original input value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/interlockedxor'
    },
    isfinite: {
        description: 'Determines if the specified floating-point value is finite.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-isfinite'
    },
    isinf: {
        description: 'Determines if the specified value is infinite.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-isinf'
    },
    isnan: {
        description: 'Determines if the specified value is NAN or QNAN.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-isnan'
    },
    ldexp: {
        description: 'Determines if the specified value is NAN or QNAN.',
        parameters: [
            { label: 'value', documentation: 'The specified value.' },
            { label: 'exp', documentation: 'The specified exponent.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-ldexp'
    },
    length: {
        description: 'Returns the length of the specified floating-point vector.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified floating-point vector.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-length'
    },
    lerp: {
        description: 'Performs a linear interpolation.',
        parameters: [
            {
                label: 'x',
                documentation: 'The first floating-point value.'
            },
            {
                label: 'y',
                documentation: 'The second floating-point value.'
            },
            {
                label: 's',
                documentation: 'A value that linearly interpolates between the x parameter and the y parameter.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-lerp'
    },
    lit: {
        description: 'Returns a lighting coefficient vector.',
        parameters: [
            {
                label: 'nDotL',
                documentation: 'The dot product of the normalized surface normal and the light vector.'
            },
            {
                label: 'nDotH',
                documentation: 'The dot product of the half-angle vector and the surface normal.'
            },
            { label: 'm', documentation: 'A specular exponent.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-lit'
    },
    log: {
        description: 'Returns the base-e logarithm of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-log'
    },
    log10: {
        description: 'Returns the base-10 logarithm of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-log10'
    },
    log2: {
        description: 'Returns the base-2 logarithm of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-log2'
    },
    mad: {
        description: 'Performs an arithmetic multiply/add operation on three values. Returns the result of x * y + a.',
        parameters: [
            {
                label: 'x',
                documentation: 'The first multiplication value.'
            },
            {
                label: 'y',
                documentation: 'The second multiplication value.'
            },
            { label: 'a', documentation: 'The addition value.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/mad'
    },
    max: {
        description: 'Selects the greater of x and y.',
        parameters: [
            { label: 'x', documentation: 'The x input value.' },
            { label: 'y', documentation: 'The y input value.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-max'
    },
    min: {
        description: 'Selects the lesser of x and y.',
        parameters: [
            { label: 'x', documentation: 'The x input value.' },
            { label: 'y', documentation: 'The y input value.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-min'
    },
    modf: {
        description: 'Splits the value x into fractional and integer parts, each of which has the same sign as x.',
        parameters: [
            { label: 'x', documentation: 'The x input value.' },
            { label: 'ip', documentation: 'The integer portion of x.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-modf'
    },
    msad4: {
        description: 'Compares a 4-byte reference value and an 8-byte source value and accumulates a vector of 4 sums. Each sum corresponds to the masked sum of absolute differences of a different byte alignment between the reference value and the source value.',
        parameters: [
            {
                label: 'reference',
                documentation: 'The reference array of 4 bytes in one uint value.'
            },
            {
                label: 'source',
                documentation: 'The source array of 8 bytes in two uint2 values.'
            },
            {
                label: 'accum',
                documentation: 'A vector of 4 values. msad4 adds this vector to the masked sum of absolute differences of the different byte alignments between the reference value and the source value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-msad4'
    },
    mul: {
        description: 'Multiplies x and y using matrix math. The inner dimension x-columns and y-rows must be equal.',
        parameters: [
            {
                label: 'x',
                documentation: 'The x input value. If x is a vector, it treated as a row vector.'
            },
            {
                label: 'y',
                documentation: 'The y input value. If y is a vector, it treated as a column vector.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-mul'
    },
    noise: {
        description: 'Generates a random value using the Perlin-noise algorithm.',
        parameters: [
            {
                label: 'value',
                documentation: 'A floating-point vector from which to generate Perlin noise.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-noise'
    },
    normalize: {
        description: 'Normalizes the specified floating-point vector according to x / length(x).',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified floating-point vector.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-normalize'
    },
    pow: {
        description: 'Returns the specified value raised to the specified power.',
        parameters: [
            { label: 'x', documentation: 'The specified value.' },
            { label: 'y', documentation: 'The specified power.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-pow'
    },
    printf: {
        description: 'Submits a custom shader message to the information queue.',
        parameters: [
            { label: 'format', documentation: 'The format string.' },
            { label: 'argument ...', documentation: 'Optional arguments.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/printf'
    },
    Process2DQuadTessFactorsAvg: {
        description: 'Generates the corrected tessellation factors for a quad patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/process2dquadtessfactorsavg'
    },
    Process2DQuadTessFactorsMax: {
        description: 'Generates the corrected tessellation factors for a quad patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/process2dquadtessfactorsmax'
    },
    Process2DQuadTessFactorsMin: {
        description: 'Generates the corrected tessellation factors for a quad patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/process2dquadtessfactorsmin'
    },
    ProcessIsolineTessFactors: {
        description: 'Generates the rounded tessellation factors for an isoline.',
        parameters: [
            {
                label: 'RawDetailFactor',
                documentation: 'The desired detail factor.'
            },
            {
                label: 'RawDensityFactor',
                documentation: 'The desired density factor.'
            },
            {
                label: 'RoundedDetailFactor',
                documentation: 'The rounded detail factor clamped to a range that can be used by the tessellator.'
            },
            {
                label: 'RoundedDensityFactor',
                documentation: 'The rounded density factor clamped to a rangethat can be used by the tessellator.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/process2dquadtessfactorsmin'
    },
    ProcessQuadTessFactorsAvg: {
        description: 'Generates the corrected tessellation factors for a quad patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/processquadtessfactorsavg'
    },
    ProcessQuadTessFactorsMax: {
        description: 'Generates the corrected tessellation factors for a quad patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/processquadtessfactorsmax'
    },
    ProcessQuadTessFactorsMin: {
        description: 'Generates the corrected tessellation factors for a quad patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/processquadtessfactorsmin'
    },
    ProcessTriTessFactorsAvg: {
        description: 'Generates the corrected tessellation factors for a tri patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/processtritessfactorsavg'
    },
    ProcessTriTessFactorsMax: {
        description: 'Generates the corrected tessellation factors for a tri patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/processtritessfactorsmax'
    },
    ProcessTriTessFactorsMin: {
        description: 'Generates the corrected tessellation factors for a tri patch.',
        parameters: [
            {
                label: 'RawEdgeFactors',
                documentation: 'The edge tessellation factors, passed into the tessellator stage.'
            },
            {
                label: 'InsideScale',
                documentation: 'The scale factor applied to the UV tessellation factors computed by the tessellation stage. The allowable range for InsideScale is 0.0 to 1.0.'
            },
            {
                label: 'RoundedEdgeTessFactors',
                documentation: 'The rounded edge-tessellation factors calculated by the tessellator stage.'
            },
            {
                label: 'RoundedInsideTessFactors',
                documentation: 'The rounded tessellation factors calculated by the tessellator stage for inside edges.'
            },
            {
                label: 'UnroundedInsideTessFactors',
                documentation: 'The tessellation factors calculated by the tessellator stage for inside edges.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/processtritessfactorsmin'
    },
    radians: {
        description: 'Converts the specified value from degrees to radians.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-radians'
    },
    rcp: {
        description: 'Calculates a fast, approximate, per-component reciprocal.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/rcp'
    },
    reflect: {
        description: 'Returns a reflection vector using an incident ray and a surface normal.',
        parameters: [
            {
                label: 'i',
                documentation: 'A floating-point, incident vector.'
            },
            {
                label: 'n',
                documentation: 'A floating-point, normal vector.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-reflect'
    },
    refract: {
        description: 'Returns a refraction vector using an entering ray, a surface normal, and a refraction index.',
        parameters: [
            {
                label: 'i',
                documentation: 'A floating-point, ray direction vector.'
            },
            {
                label: 'n',
                documentation: 'A floating-point, surface normal vector.'
            },
            {
                label: 'η',
                documentation: 'A floating-point, refraction index scalar.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-refract'
    },
    reversebits: {
        description: 'Reverses the order of the bits, per component.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/reversebits'
    },
    round: {
        description: 'Rounds the specified value to the nearest integer.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-round'
    },
    rsqrt: {
        description: 'Returns the reciprocal of the square root of the specified value.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-rsqrt'
    },
    saturate: {
        description: 'Clamps the specified value within the range of 0 to 1.',
        parameters: [{ label: 'value', documentation: 'The specified value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-saturate'
    },
    sign: {
        description: 'Returns the sign of x.',
        parameters: [{ label: 'value', documentation: 'The input value.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-sign'
    },
    sin: {
        description: 'Returns the sine of the specified value.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value, in radians.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-sin'
    },
    sincos: {
        description: 'Returns the sine and cosine of x.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value, in radians.'
            },
            { label: 's', documentation: 'Returns the sine of x.' },
            { label: 'c', documentation: 'Returns the cosine of x.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-sincos'
    },
    sinh: {
        description: 'Returns the hyperbolic sine of the specified value.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value, in radians.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-sinh'
    },
    smoothstep: {
        description: 'Returns a smooth Hermite interpolation between 0 and 1, if x is in the range [min, max].',
        parameters: [
            {
                label: 'min',
                documentation: 'The minimum range of the x parameter.'
            },
            {
                label: 'max',
                documentation: 'The maximum range of the x parameter.'
            },
            {
                label: 'x',
                documentation: 'The specified value to be interpolated.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-smoothstep'
    },
    sqrt: {
        description: 'Returns the square root of the specified floating-point value, per component.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified floating-point value.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-sqrt'
    },
    step: {
        description: 'Compares two values, returning 0 or 1 based on which value is greater.',
        parameters: [
            {
                label: 'y',
                documentation: 'The first floating-point value to compare.'
            },
            {
                label: 'x',
                documentation: 'The second floating-point value to compare.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-step'
    },
    tan: {
        description: 'Returns the tangent of the specified value.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value, in radians.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tan'
    },
    tanh: {
        description: 'Returns the hyperbolic tangent of the specified value.',
        parameters: [
            {
                label: 'value',
                documentation: 'The specified value, in radians.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tanh'
    },
    tex1D: {
        description: 'Samples a 1D texture.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex1d'
    },
    tex1Dbias: {
        description: 'Samples a 1D texture after biasing the mip level by t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex1dbias'
    },
    tex1Dgrad: {
        description: 'Samples a 1D texture using a gradient to select the mip level.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' },
            {
                label: 'ddx',
                documentation: 'Rate of change of the surface geometry in the x direction.'
            },
            {
                label: 'ddy',
                documentation: 'Rate of change of the surface geometry in the y direction.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex1dgrad'
    },
    tex1Dlod: {
        description: 'Samples a 1D texture with mipmaps. The mipmap LOD is specified in t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex1dlod'
    },
    tex1Dproj: {
        description: 'Samples a 1D texture using a projective divide; the texture coordinate is divided by t.w before the lookup takes place.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex1dproj'
    },
    tex2D: {
        description: 'Samples a 2D texture.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex2d'
    },
    tex2Dbias: {
        description: 'Samples a 2D texture after biasing the mip level by t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex2dbias'
    },
    tex2Dgrad: {
        description: 'Samples a 2D texture using a gradient to select the mip level.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' },
            {
                label: 'ddx',
                documentation: 'Rate of change of the surface geometry in the x direction.'
            },
            {
                label: 'ddy',
                documentation: 'Rate of change of the surface geometry in the y direction.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex2dgrad'
    },
    tex2Dlod: {
        description: 'Samples a 2D texture with mipmaps. The mipmap LOD is specified in t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex2dlod'
    },
    tex2Dproj: {
        description: 'Samples a 2D texture using a projective divide; the texture coordinate is divided by t.w before the lookup takes place.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex2dproj'
    },
    tex3D: {
        description: 'Samples a 3D texture.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex3d'
    },
    tex3Dbias: {
        description: 'Samples a 3D texture after biasing the mip level by t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex3dbias'
    },
    tex3Dgrad: {
        description: 'Samples a 3D texture using a gradient to select the mip level.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' },
            {
                label: 'ddx',
                documentation: 'Rate of change of the surface geometry in the x direction.'
            },
            {
                label: 'ddy',
                documentation: 'Rate of change of the surface geometry in the y direction.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex3dgrad'
    },
    tex3Dlod: {
        description: 'Samples a 3D texture with mipmaps. The mipmap LOD is specified in t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex3dlod'
    },
    tex3Dproj: {
        description: 'Samples a 3D texture using a projective divide; the texture coordinate is divided by t.w before the lookup takes place.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-tex3dproj'
    },
    texCUBE: {
        description: 'Samples a cube texture.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texcube'
    },
    texCUBEbias: {
        description: 'Samples a cube texture after biasing the mip level by t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texcubebias'
    },
    texCUBEgrad: {
        description: 'Samples a cube texture using a gradient to select the mip level.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' },
            {
                label: 'ddx',
                documentation: 'Rate of change of the surface geometry in the x direction.'
            },
            {
                label: 'ddy',
                documentation: 'Rate of change of the surface geometry in the y direction.'
            }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texcubegrad'
    },
    texCUBElod: {
        description: 'Samples a cube texture with mipmaps. The mipmap LOD is specified in t.w.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texcubelod'
    },
    texCUBEproj: {
        description: 'Samples a cube texture using a projective divide; the texture coordinate is divided by t.w before the lookup takes place.',
        parameters: [
            { label: 's', documentation: 'The sampler state.' },
            { label: 't', documentation: 'The texture coordinate.' }
        ],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texcubeproj'
    },
    transpose: {
        description: 'Transposes the specified input matrix.',
        parameters: [{ label: 'value', documentation: 'The specified matrix.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-transpose'
    },
    trunc: {
        description: 'Truncates a floating-point value to the integer component.',
        parameters: [{ label: 'value', documentation: 'The specified input.' }],
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-trunc'
    }
}

export var preprocessors: IEntries = {
    DEFINE: {
        description: 'Preprocessor directive that defines a constant or a macro.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-define'
    },
    ERROR: {
        description: 'Preprocessor directive that produces compiler-time error messages.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-error'
    },
    IF: {
        description: 'Preprocessor directives that control compilation of portions of a source file.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-if'
    },
    ELIF: {
        description: 'Preprocessor directives that control compilation of portions of a source file.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-if'
    },
    ELSE: {
        description: 'Preprocessor directives that control compilation of portions of a source file.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-if'
    },
    ENDIF: {
        description: 'Preprocessor directives that control compilation of portions of a source file.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-if'
    },
    IFDEF: {
        description: 'Preprocessor directives that determine whether a specific preprocessor constant or macro is defined.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-ifdef'
    },
    IFNDEF: {
        description: 'Preprocessor directives that determine whether a specific preprocessor constant or macro is defined.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-ifdef'
    },
    INCLUDE: {
        description: 'Preprocessor directive that inserts the contents of the specified file into the source program at the point where the directive appears.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-include'
    },
    LINE: {
        description: "Preprocessor directive that sets the compiler's internally-stored line number and filename to the specified values.",
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-line'
    },
    PRAGMA: {
        description: 'Preprocessor directive that provides machine-specific or operating system-specific features while retaining overall compatibility with the C and C++ languages.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-pragma'
    },
    UNDEF: {
        description: 'Preprocessor directive that removes the current definition of a constant or macro that was previously defined using the #define directive.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-pre-undef'
    }
}

export var semanticsNum: IEntries = {
    BINORMAL: {
        description: 'Binormal',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    BLENDINDICES: {
        description: 'Blend indices',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    BLENDWEIGHT: {
        description: 'Blend weights',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    COLOR: {
        description: 'Diffuse and/or specular color',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    NORMAL: {
        description: 'Normal vector',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    POSITION: {
        description: 'Vertex position in object space.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    PSIZE: {
        description: 'Point size',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    TANGENT: {
        description: 'Tangent',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    TEXCOORD: {
        description: 'Texture coordinates',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    TESSFACTOR: {
        description: 'Tessellation factor',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    DEPTH: {
        description: 'Output depth',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_CLIPDISTANCE: {
        description: 'Clip distance data.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_CULLDISTANCE: {
        description: 'Cull distance data.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_DEPTHGREATEREQUAL: {
        description: 'Valid in any shader, tests whether the value is greater than or equal to the depth data value.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_DEPTHLESSEQUAL: {
        description: 'Valid in any shader, tests whether the value is less than or equal to the depth data value.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_TARGET: {
        description: 'The output value that will be stored in a render target. The index indicates which of the 8 possibly bound render targets to write to. The value is available to all shaders.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    }
}

export var semantics: IEntries = {
    POSITIONT: {
        description: 'Transformed vertex position.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    FOG: {
        description: 'Vertex fog',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    PSIZE: {
        description: 'Point size',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    VFACE: {
        description: 'Floating-point scalar that indicates a back-facing primitive. A negative value faces backwards, while a positive value faces the camera.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    VPOS: {
        description: 'The pixel location (x,y) in screen space.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_COVERAGE: {
        description: 'A mask that can be specified on input, output, or both of a pixel shader.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_DEPTH: {
        description: 'Depth buffer data. Can be written or read by any shader.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_DISPATCHTHREADID: {
        description: 'Defines the global thread offset within the Dispatch call, per dimension of the group. Available as input to compute shader. (read only)',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-dispatchthreadid'
    },
    SV_DOMAINLOCATION: {
        description: 'Defines the location on the hull of the current domain point being evaluated. Available as input to the domain shader. (read only)',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-domainlocation'
    },
    SV_GROUPID: {
        description: 'Defines the group offset within a Dispatch call, per dimension of the dispatch call. Available as input to the compute shader. (read only)',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupid'
    },
    SV_GROUPINDEX: {
        description: 'Provides a flattened index for a given thread within a given group. Available as input to the compute shader. (read only)',
        link: 'https://docs.microsoft.com/en-us/previous-versions/windows/desktop/legacy/ff471569(v=vs.85)'
    },
    SV_GROUPTHREADID: {
        description: 'Defines the thread offset within the group, per dimension of the group. Available as input to the compute shader. (read only)',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-groupthreadid'
    },
    SV_GSINSTANCEID: {
        description: 'Defines the instance of the geometry shader. Available as input to the geometry shader. The instance is needed as a geometry shader can be invoked up to 32 times on the same geometry primitive.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-gsinstanceid'
    },
    SV_INNERCOVERAGE: {
        description: 'Represents underestimated conservative rasterization information (i.e. whether a pixel is guaranteed-to-be-fully covered). Can be read or written by the pixel shader.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_INSIDETESSFACTOR: {
        description: 'Defines the tessellation amount within a patch surface. Available in the hull shader for writing, and available in the domain shader for reading.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-insidetessfactor'
    },
    SV_INSTANCEID: {
        description: 'Per-instance identifier automatically generated by the runtime (see Using System-Generated Values (Direct3D 10)). Available to all shaders.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_ISFRONTFACE: {
        description: 'Specifies whether a triangle is front facing. For lines and points, IsFrontFace has the value true. The exception is lines drawn out of triangles (wireframe mode), which sets IsFrontFace the same way as rasterizing the triangle in solid mode. Can be written to by the geometry shader, and read by the pixel shader.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_OUTPUTCONTROLPOINTID: {
        description: 'Defines the index of the control point ID being operated on by an invocation of the main entry point of the hull shader. Can be read by the hull shader only.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-outputcontrolpointid'
    },
    SV_POSITION: {
        description: 'When SV_Position is declared for input to a shader, it can have one of two interpolation modes specified: linearNoPerspective or linearNoPerspectiveCentroid, where the latter causes centroid-snapped xyzw values to be provided when multisample antialiasing. When used in a shader, SV_Position describes the pixel location. Available in all shaders to get the pixel center with a 0.5 offset.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_PRIMITIVEID: {
        description: 'Per-primitive identifier automatically generated by the runtime (see Using System-Generated Values (Direct3D 10)). Can be written to by the geometry or pixel shaders, and read by the geometry, pixel, hull or domain shaders.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_RENDERTARGETARRAYINDEX: {
        description: 'Render-target array index. Applied to geometry shader output and indicates the render target array slice that the primitive will be drawn to by the pixel shader. SV_RenderTargetArrayIndex is only valid if the render target is an array resource. This semantic applies only to primitives, if a primitive has more than one vertex the value from the leading vertex will be used. This value also indicates which array slice of a depthstencilview is used for read/write purposes. Can be written from the geometry shader and read or written by the pixel shader.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_SAMPLEINDEX: {
        description: 'Sample frequency index data. Available to be read or written to by the pixel shader only.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_STENCILREF: {
        description: 'Represents the current pixel shader stencil reference value. Can be written by the pixel shader only.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_TESSFACTOR: {
        description: 'Defines the tessellation amount on each edge of a patch. Available for writing in the hull shader and reading in the domain shader.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sv-tessfactor'
    },
    SV_VERTEXID: {
        description: 'Per-vertex identifier automatically generated by the runtime (see Using System-Generated Values (Direct3D 10)). Available as the input to the vertex shader only.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    },
    SV_VIEWPORTARRAYINDEX: {
        description: 'Viewport array index. Applied to geometry shader output and indicates which viewport to use for the primitive currently being written out. Can be read or written by the pixel shader. The primitive will be transformed and clipped against the viewport specified by the index before it is passed to the rasterizer. This semantic applies only to primitives, if a primitive has more than one vertex the value from the leading vertex will be used.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics'
    }
}

export var datatypes: IEntries = {
    bool: {
        description: 'true or false.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    int: {
        description: '32-bit signed integer.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    int1: {
        description: '32-bit signed integer vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    int2: {
        description: '32-bit signed integer vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    int3: {
        description: '32-bit signed integer vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    int4: {
        description: '32-bit signed integer vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    int1x1: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int1x2: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int1x3: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int1x4: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int2x1: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int2x2: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int2x3: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int2x4: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int3x1: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int3x2: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int3x3: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int3x4: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int4x1: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int4x2: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int4x3: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    int4x4: {
        description: '32-bit signed integer matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    uint: {
        description: '32-bit unsigned integer.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    dword: {
        description: '32-bit unsigned integer.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    half: {
        description: '16-bit floating point value. This data type is provided only for language compatibility. Direct3D 10 shader targets map all half data types to float data types. A half data type cannot be used on a uniform global variable (use the /Gec flag if this functionality is desired).',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    half1: {
        description: '16-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    half2: {
        description: '16-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    half3: {
        description: '16-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    half4: {
        description: '16-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    float: {
        description: '32-bit floating point value.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    float1: {
        description: '32-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    float2: {
        description: '32-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    float3: {
        description: '32-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    float4: {
        description: '32-bit floating point vector.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    float1x1: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float1x2: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float1x3: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float1x4: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float2x1: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float2x2: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float2x3: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float2x4: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float3x1: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float3x2: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float3x3: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float3x4: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float4x1: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float4x2: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float4x3: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    float4x4: {
        description: '32-bit floating point matrix.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    double: {
        description: '64-bit floating point value. You cannot use double precision values as inputs and outputs for a stream. To pass double precision values between shaders, declare each double as a pair of uint data types. Then, use the asdouble function to pack each double into the pair of uints and the asuint function to unpack the pair of uints back into the double.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    min16float: {
        description: 'minimum 16-bit floating point value.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    min10float: {
        description: 'minimum 10-bit floating point value.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    min16int: {
        description: 'minimum 16-bit signed integer.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    min12int: {
        description: 'minimum 12-bit signed integer.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    min16uint: {
        description: 'minimum 16-bit unsigned integer.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-scalar'
    },
    Buffer: {
        description: 'Use to declare a buffer variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-buffer'
    },
    vector: {
        description: 'A vector contains between one and four scalar components; every component of a vector must be of the same type.',
        link: 'https://docs.microsoft.com/en-ca/windows/win32/direct3dhlsl/dx-graphics-hlsl-vector'
    },
    matrix: {
        description: 'A matrix is a special data type that contains between one and sixteen components. Every component of a matrix must be of the same type.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-matrix'
    },
    sampler: {
        description: 'Use to declare sampler state as well as sampler-comparison state.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-sampler'
    },
    SamplerState: {
        description: 'Use to declare sampler state as well as sampler-comparison state.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-sampler'
    },
    PixelShader: {
        description: 'Declare a shader variable within an effect pass.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-shader'
    },
    VertexShader: {
        description: 'Declare a shader variable within an effect pass.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-shader'
    },
    texture: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    Texture1D: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    Texture1DArray: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    Texture2D: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    Texture2DArray: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    Texture2DMS: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    Texture2DMSArray: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    Texture3D: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    TextureCube: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    TextureCubeArray: {
        description: 'Use to declare a texture variable.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-texture'
    },
    struct: {
        description: 'Use to declare a structure using HLSL.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-struct'
    },
    typedef: {
        description: 'Use to declare a user-defined type.',
        link: 'https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-user-defined'
    }
}

//TODO: descriptions and links
export var keywords: IEntries = {
    AppendStructuredBuffer: { description: "" },
    asm: { description: "" },
    asm_fragment: { description: "" },
    BlendState: { description: "" }, 
    bool: { description: "" }, 
    break: { description: "" }, 
    Buffer: { description: "" }, 
    ByteAddressBuffer: { description: "" },
    case: { description: "" }, 
    cbuffer: { description: "" }, 
    centroid: { description: "" }, 
    class: { description: "" }, 
    column_major: { description: "" }, 
    compile: { description: "" }, 
    compile_fragment: { description: "" }, 
    CompileShader: { description: "" }, 
    const: { description: "" }, 
    continue: { description: "" }, 
    ComputeShader: { description: "" }, 
    ConsumeStructuredBuffer: { description: "" },
    default: { description: "" }, 
    DepthStencilState: { description: "" }, 
    DepthStencilView: { description: "" }, 
    discard: { description: "" }, 
    do: { description: "" }, 
    double: { description: "" }, 
    DomainShader: { description: "" }, 
    dword: { description: "" },
    else: { description: "" }, 
    export: { description: "" }, 
    extern: { description: "" },
    false: { description: "" }, 
    float: { description: "" }, 
    for: { description: "" }, 
    fxgroup: { description: "" },
    GeometryShader: { description: "" }, 
    groupshared: { description: "" },
    half: { description: "" }, 
    Hullshader: { description: "" },
    if: { description: "" }, 
    in: { description: "" }, 
    inline: { description: "" }, 
    inout: { description: "" }, 
    InputPatch: { description: "" }, 
    int: { description: "" }, 
    interface: { description: "" },
    line: { description: "" }, 
    lineadj: { description: "" }, 
    linear: { description: "" }, 
    LineStream: { description: "" },
    matrix: { description: "" }, 
    min16float: { description: "" }, 
    min10float: { description: "" }, 
    min16int: { description: "" }, 
    min12int: { description: "" }, 
    min16uint: { description: "" },
    namespace: { description: "" }, 
    nointerpolation: { description: "" }, 
    noperspective: { description: "" }, 
    NULL: { description: "" },
    out: { description: "" }, 
    OutputPatch: { description: "" },
    packoffset: { description: "" }, 
    pass: { description: "" }, 
    pixelfragment: { description: "" }, 
    PixelShader: { description: "" }, 
    point: { description: "" }, 
    PointStream: { description: "" }, 
    precise: { description: "" },
    RasterizerState: { description: "" }, 
    RenderTargetView: { description: "" }, 
    return: { description: "" }, 
    register: { description: "" }, 
    row_major: { description: "" }, 
    RWBuffer: { description: "" }, 
    RWByteAddressBuffer: { description: "" }, 
    RWStructuredBuffer: { description: "" }, 
    RWTexture1D: { description: "" }, 
    RWTexture1DArray: { description: "" }, 
    RWTexture2D: { description: "" }, 
    RWTexture2DArray: { description: "" }, 
    RWTexture3D: { description: "" },
    sample: { description: "" }, 
    sampler: { description: "" }, 
    SamplerState: { description: "" }, 
    SamplerComparisonState: { description: "" }, 
    shared: { description: "" }, 
    snorm: { description: "" }, 
    stateblock: { description: "" }, 
    stateblock_state: { description: "" }, 
    static: { description: "" }, 
    string: { description: "" }, 
    struct: { description: "" }, 
    switch: { description: "" }, 
    StructuredBuffer: { description: "" },
    tbuffer: { description: "" }, 
    technique: { description: "" }, 
    technique10: { description: "" }, 
    technique11: { description: "" }, 
    texture: { description: "" }, 
    Texture1D: { description: "" }, 
    Texture1DArray: { description: "" }, 
    Texture2D: { description: "" }, 
    Texture2DArray: { description: "" }, 
    Texture2DMS: { description: "" }, 
    Texture2DMSArray: { description: "" }, 
    Texture3D: { description: "" }, 
    TextureCube: { description: "" }, 
    TextureCubeArray: { description: "" }, 
    true: { description: "" }, 
    typedef: { description: "" }, 
    triangle: { description: "" }, 
    triangleadj: { description: "" }, 
    TriangleStream: { description: "" },
    uint: { description: "" }, 
    uniform: { description: "" }, 
    unorm: { description: "" }, 
    unsigned: { description: "" },
    vector: { description: "" }, 
    vertexfragment: { description: "" }, 
    VertexShader: { description: "" }, 
    void: { description: "" }, 
    volatile: { description: "" },
    while: { description: "" }
}

