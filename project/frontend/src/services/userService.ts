// import axios, { AxiosResponse } from "axios";
// import configService from "./configService";
// import { QueryResult, QueryTable } from "@/models/table";
// import { User } from "@/models/user";
//
// export default {
//   async search(data: QueryTable): Promise<QueryResult> {
//     const res: AxiosResponse = await axios.post(
//       configService.usersSearchUrl(),
//       data
//     );
//     return {
//       items: res.data.items,
//       count: res.data.count,
//     } as QueryResult;
//   },
//   async get(): Promise<Array<User>> {
//     const res = await axios.get(configService.usersUrl());
//     return res.data.items;
//   },
//   async post(licenseKey: string, data: any): Promise<AxiosResponse> {
//     delete data.showPassword;
//     return await axios.post(configService.usersUrl(), {
//       licenseKey,
//       ...data,
//     });
//   },
//   async patch(id: string, data: any): Promise<AxiosResponse> {
//     return await axios.patch(configService.usersUrl() + "/" + id, data);
//   },
//   async delete(id: string): Promise<AxiosResponse> {
//     return await axios.delete(configService.usersUrl() + "/" + id);
//   },
// };
