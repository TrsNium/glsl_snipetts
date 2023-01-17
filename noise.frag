float vnoise21(vec2 p){
    vec2 n = floor(p);
    float[4] v;
    for (int j=0; j<2; j++){
        for(int i=0; i<2; i++){
            v[i+2*j] = hash21(n + vec2(i, j));
        }
    }
    vec2 f = fract(p);
    return mix(mix(v[0], v[1], f[0]), mix(v[2], v[3], f[0]), f[1]);
}

float vnoise31(vec3 p){
    vec3 n = floor(p);
    float [8] v;
    for(int k=0; k<2; k++){
        for(int j=0; j<2; j++){
            for(int i=0; i<2; i++){
                v[i+2*j + 4*k] = hash31(n + vec3(i, j, k));
            }
        }
    }
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float[2] w;
    for(int i=0; i<2; i++){
        w[i] = mix(mix(v[4*i], v[4*i+1], f[0]), mix(v[4*i+2], v[4*i+3], f[0]), f[1]);
    }
    return mix(w[0], w[1], f[2]);
}

vec2 gnoise(vec2 p){
    vec2 n = floor(p);
    vec2 f = fract(p);
    float[4] v;
    for (int j=0; j<2; j++){
        for(int i=0; i<2; i++){
            vec2 g = normalize(hash22(n + vec2(i, j)) - vec2(0.5));
            v[i+2*j] = dot(g , f -vec2(i, j));
        }
    }
    f = f* f* f*(10.0 - 15.0 * f + 6.0 * f * f);
    return 0.5 * mix (mix(v[0], v[1], f[0]), mix(v[2], v[3], f[0]), f[1]) + 0.5;
}

float gtable2(vec2 lattice, vec2 p){
    uvec2 n = floatBitsToUint(lattice);
    uint ind = uhash22(n).x >> 29;
    float u = 0.92387953 * (ind < 4u ? p.x : p.y); // 0.92387953 ≒ cos(pi/8)
    float v = 0.38268343 * (ind < 4u ? p.y : p.x); // 0.38268343 ≒ sin(pi/8)
    return ((ind&1u)==0u?u:-u) + ((ind&2u)==0u?v:-v);
}

float pnoise21(vec2 p){
    vec2 n = floor(p);
    vec2 f = fract(p);
    float[4] v;
    for (int j=0; j<2; j++){
        for(int i=0; i<2; i++){
            v[i+2*j] = gtable2(n+vec2(i,j), f-vec2(i,j));
        }
    }
    f = f * f * f * (10.0 - 15.0 * f + 6.0 * f * f);
    return mix(mix(v[0], v[1], f[0]), mix(v[2], v[3], f[0]), f[1]);
}

float gtable3(vec3 lattice, vec3 p){
    uvec3 n = floatBitsToUint(lattice);
    uint ind = uhash33(n).x >> 28;
    float u = ind < 8u ? p.x : p.y;
    float v = ind < 4u ? p.y : ind == 12u || ind == 14u ? p.x : p.z;
    return ((ind & 1u) == 0u ? u : -u) + ((ind & 2u) == 0u ? v : -v);
}

float pnoise31(vec3 p){
    vec3 n = floor(p);
    vec3 f = fract(p);
    float[8] v;
    for (int k=0; k<2; k++){
        for (int j=0; j<2; j++){
            for(int i=0; i<2; i++){
                v[i+2*j+4*k] = gtable3(n + vec3(i, j, k), f - vec3(i, j, k)) * 0.70710678;
                // 0.70710678≒sqrt(2)
            }
        }
    }
    f = f * f * f * (10.0 - 15.0 * f + 6.0 * f * f);
    float[2] w;
    for(int i=0; i<2; i++){
        w[i] = mix(mix(v[4*i], v[4*i+1], f[0]), mix(v[4*i+2], v[4*i+3], f[0]), f[1]);
    }
    return 0.5 *mix(w[0], w[1], f[2])+0.5;
}