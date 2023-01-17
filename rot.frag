vec2 rot2(vec2 p, float t){
    return vec2(cos(t) * p.x - sin(t) * p.y, sin(t) * p.x + cos(t) * p.y);
}

vec2 rot2(vec2 p, float t){
    return vec2(cos(t) * p.x - sin(t) * p.y, sin(t) * p.x + cos(t) * p.y);
}

vec3 rotX(vec3 p, float t){
    p.yz = rot2(p.yz, t);
    return p;
}

vec3 rotY(vec3 p, float t){
    p.xz = rot2(p.xz, t);
    return p;
}
