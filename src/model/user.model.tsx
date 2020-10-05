import {GenerationModel} from "../routes/loggedIn/theTool/generationModel";

export type UserDocument = {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    tokens: AuthToken[];

    settings: GenerationModel;

    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };

    authenticated?: boolean;
};

export interface AuthToken {
    accessToken: string;
    kind: string;
}
